//
//  CFDProfitShareModel.h
//  RightBTC
//
//  Created by 曾祥洁 on 2021/3/29.
//  Copyright © 2021 LYX. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

typedef NS_ENUM(NSUInteger, SASProfitShareType) {
    SASProfitShareTypeCurrent   =   0,  //当前持仓
    SASProfitShareTypeHistory,          //历史仓位
};

@interface CFDProfitShareModel : NSObject
@property (nonatomic, assign) double profitRate;
@property (nonatomic, copy) NSString * contractType;
@property (nonatomic, copy) NSString * pingcangPrice;
@property (nonatomic, copy) NSString * kaicangPrice;
@property (nonatomic, copy) NSString * currtentPrice;
@property (nonatomic, copy) NSString * direction;
@property (nonatomic, assign) SASProfitShareType type;//持仓列表/历史仓位
@property (nonatomic, copy) NSString * instrument;
@property (nonatomic, assign) NSInteger leverage; // 杠杆
@end

NS_ASSUME_NONNULL_END
