// 预计强平价 =( (风险率* (投入保证金-手续费）)-(投入保证金-手续费) )/((单笔委托数量(求和) *合约方向))+开仓均价，风险率=10%
/**
 * 
 * @param {*} riskRate 风险率
 * @param {*} depositMargin 投入保证金
 * @param {*} processingFee 手续费
 * @param {*} commissionQuantitySum 单笔委托数量(求和)= 张数(求和) * 面值
 * @param {*} direction 合约方向
 * @param {*} averageOpeningPrice 开仓均价
 */
function expectedStrongParity(riskRate, depositMargin, processingFee, commissionQuantitySum, direction, averageOpeningPrice) {
    return (riskRate * (depositMargin - processingFee) - (depositMargin - processingFee)) / (commissionQuantitySum * direction) + averageOpeningPrice;
}

// 开仓手续费
// 1.按金额 : 下单金额*杠杆*手续费率
// 2.按数量:  手续费率 * 价格 * 数量( basesize = 张数 * 合约单位) * 2

/**
 * @param {*} gridPriceList 网格价格数组
 * @param {*} currentPrice 当前价格
 * @param {*} direction 合约方向
 * @param {*} index 网格价格数组索引
 * @param {*} quantityOfSingleCommission 单笔委托数量
 * @param {*} taker 手续费率
 * @param {*} maker 手续费率
 */
// 公式是按照方式2，即按数量计算的开仓手续费
function getProcessingFee ({
    gridPriceList,
    currentPrice,
    direction,
    index,
    quantityOfSingleCommission,
    taker,
    maker,
}) {
    let processingFee = 0;
    if(direction === 1){
        // 做多手续费
        for (let i = index; i < gridPriceList.length; i++) {
            if(gridPriceList[i] < currentPrice){
                processingFee += maker * gridPriceList[i] * quantityOfSingleCommission * 2;
            } else {
                processingFee += taker * currentPrice * quantityOfSingleCommission * 2;
            }
        }
    } else {
        // 做空手续费
        for (let i = index; i < gridPriceList.length; i++) {
            if(gridPriceList[i] > currentPrice){
                processingFee += maker * gridPriceList[i] * quantityOfSingleCommission * 2;
            } else {
                processingFee += taker * currentPrice * quantityOfSingleCommission * 2;
            }
        }
    }

    return processingFee;
};

// 1. 做多预计强平价
// 做多开仓均价
function getBuyLongAverageOpeningPrice(gridPriceList, currentPrice, index) {
    let sum  = 0;
    for (let i = index; i < gridPriceList.length; i++) {
        if(gridPriceList[i] < currentPrice){
            sum += gridPriceList[i];
        } else {
            sum += currentPrice;
        }
    }

    return sum / (gridPriceList.length - index);
}

// 中性多头开仓均价
function getNeutralBuyLongAverageOpeningPrice(gridPriceList, currentPrice, index) {
    let sum = 0;
    for (let i = index; i < gridPriceList.length; i++) {
        if(gridPriceList[i] <= currentPrice){
            sum += gridPriceList[i];
        }
    }

    return sum / (gridPriceList.length - index);
}

// 循环计算得出做多预计强平价
function buyLongLoop({
    riskRate, // 风险率
    depositMargin, // 投入保证金
    leverage, // 杠杆
    taker, // 手续费率
    maker, // 手续费率
    quantityOfSingleCommission, // 单笔委托数量
    direction, // 合约方向
    gridPriceList, // 网格价格数组
    gridNumber, // 网格数量
    currentPrice, // 当前价格,
    isNeutral = false, // 是否是中性,默认是false
}){
    gridPriceList = isNeutral ? gridPriceList : gridPriceList.slice(0, gridNumber);
    const averageOpeningPriceList = []; // 开仓均价数组
    let index = gridPriceList.length - 1;
    let predictsStrongParity = 0;
    let numberOfPendingOrders = 0; // 挂单笔数
    while(index >= 0){
        // 开仓均价
        const averageOpeningPrice = isNeutral ? getNeutralBuyLongAverageOpeningPrice(gridPriceList, currentPrice, index) : getBuyLongAverageOpeningPrice(gridPriceList, currentPrice, index);
        numberOfPendingOrders++;
        averageOpeningPriceList.push(averageOpeningPrice);
        // 开仓手续费
        const processingFee = getProcessingFee({
            gridPriceList,
            currentPrice,
            direction,
            index,
            quantityOfSingleCommission,
            taker,
            maker
        });
        // 单笔委托数量(求和)
        const commissionQuantitySum = quantityOfSingleCommission * numberOfPendingOrders;
        // 预计强平价
        predictsStrongParity = expectedStrongParity(riskRate, depositMargin, processingFee, commissionQuantitySum, direction, averageOpeningPrice);
        if(index === 0) break;
        if(predictsStrongParity < gridPriceList[index - 1]) {
            index--;
        }else {
            break;
        }
    }

    return predictsStrongParity;
}

// 2. 做空预计强平价
// 做空开仓均价
function getShortSellingAverageOpeningPrice(gridPriceList, currentPrice, index) {
    let sum  = 0;
    for (let i = index; i < gridPriceList.length; i++) {
        if(gridPriceList[i] > currentPrice){
            sum += gridPriceList[i];
        } else {
            sum += currentPrice;
        }
    }

    return sum / (gridPriceList.length - index);
}
// 中性空头开仓均价
function getNeutralShortSellingAverageOpeningPrice(gridPriceList, currentPrice, index) {
    let sum  = 0;
    for (let i = index; i < gridPriceList.length; i++) {
        if(gridPriceList[i] > currentPrice) {
            sum += gridPriceList[i];
        }
    }

    return sum / (gridPriceList.length - index);
}
// 循环计算得出做空预计强平价
function shortSellingLoop({
    riskRate, // 风险率
    depositMargin, // 投入保证金
    leverage, // 杠杆
    taker, // 手续费率
    maker, // 手续费率
    quantityOfSingleCommission, // 单笔委托数量
    direction, // 合约方向
    gridPriceList, // 网格价格数组
    gridNumber, // 网格数量
    currentPrice, // 当前价格,
    isNeutral = false, // 是否是中性,默认是false
}){
    gridPriceList = isNeutral ? gridPriceList.reverse() : gridPriceList.reverse().slice(0, gridNumber);
    const averageOpeningPriceList = []; // 开仓均价数组
    let index = gridPriceList.length - 1;
    let predictsStrongParity = 0;
    let numberOfPendingOrders = 0; // 挂单笔数
    while(index >= 0){
        const averageOpeningPrice = isNeutral ? getNeutralShortSellingAverageOpeningPrice(gridPriceList, currentPrice, index) : getShortSellingAverageOpeningPrice(gridPriceList, currentPrice, index);
        numberOfPendingOrders++;
        averageOpeningPriceList.push(averageOpeningPrice);
        // 开仓手续费
        const processingFee = getProcessingFee({
            gridPriceList,
            currentPrice,
            direction,
            index,
            quantityOfSingleCommission,
            taker,
            maker
        });
        // 单笔委托数量(求和)
        const commissionQuantitySum = quantityOfSingleCommission * numberOfPendingOrders;
        // 预计强平价
        predictsStrongParity = expectedStrongParity(riskRate, depositMargin, processingFee, commissionQuantitySum, direction, averageOpeningPrice);
        if(index === 0) break;
        if(predictsStrongParity > gridPriceList[index - 1]) {
            index--;
        }else {
            break;
        }
    }

    return predictsStrongParity;
}

function getGridPriceList(gridPriceList, gridNumber, currentPrice) {
    // 挂单量=网格数量,做多优先
    let buyLongNum = 0; // 做多数量
    for (let i = 0; i < gridPriceList.length; i++) {
        if(gridPriceList[i] < currentPrice){
            buyLongNum++;
        }
    }

    let buyLongGridPriceList = [];
    let shortSellingGridPriceList = [];
    if( buyLongNum >= gridNumber ){
        buyLongNum = gridNumber;
        buyLongGridPriceList = gridPriceList.slice(0, buyLongNum);
        shortSellingGridPriceList = [];
    } else {
        buyLongGridPriceList = gridPriceList.slice(0, buyLongNum);
        if(gridNumber - buyLongNum <= gridPriceList.length - buyLongNum){
            shortSellingGridPriceList = gridPriceList.slice(-(gridNumber - buyLongNum));
        } else {
            shortSellingGridPriceList = gridPriceList.slice(buyLongNum);
        }
    }

    return [buyLongGridPriceList, shortSellingGridPriceList];
}
// 3.中性多头或者空头预计强平价
function neutralLoop({
    riskRate, // 风险率
    depositMargin, // 投入保证金
    leverage, // 杠杆
    taker, // 手续费率
    maker, // 手续费率
    quantityOfSingleCommission, // 单笔委托数量
    direction, // 合约方向
    gridPriceList, // 网格价格数组
    gridNumber, // 网格数量
    currentPrice, // 当前价格,
}){
    const [
        buyLongGridPriceList,
        shortSellingGridPriceList,
    ] = getGridPriceList(gridPriceList, gridNumber, currentPrice);

    // 中性多头
    const buyLongPredictsStrongParity  = buyLongLoop({
        riskRate, // 风险率
        depositMargin, // 投入保证金
        leverage, // 杠杆
        taker, // 手续费率
        maker, // 手续费率
        quantityOfSingleCommission, // 单笔委托数量
        direction: 1, // 合约方向
        gridPriceList: buyLongGridPriceList, // 网格价格数组
        gridNumber: buyLongGridPriceList.length, // 网格数量
        currentPrice, // 当前价格,
        isNeutral: true, // 是否是中性
    });

    // 中性空头
    const shortSellingPredictsStrongParity  = shortSellingLoop({
        riskRate, // 风险率
        depositMargin, // 投入保证金
        leverage, // 杠杆
        taker, // 手续费率
        maker, // 手续费率
        quantityOfSingleCommission, // 单笔委托数量
        direction: -1, // 合约方向
        gridPriceList: shortSellingGridPriceList, // 网格价格数组
        gridNumber: shortSellingGridPriceList.length, // 网格数量
        currentPrice, // 当前价格,
        isNeutral: true, // 是否是中性
    });

    return `${buyLongPredictsStrongParity};${shortSellingPredictsStrongParity}`;
}