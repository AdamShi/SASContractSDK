//
//  CFDProfitShareModel.h
//  RightBTC
//
//  Created by 曾祥洁 on 2021/3/29.
//  Copyright © 2021 LYX. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface CFDProfitShareModel : NSObject
@property (nonatomic, assign) double profitRate;
@property (nonatomic, copy) NSString * contractType;
@property (nonatomic, copy) NSString * pingcangPrice;
@property (nonatomic, copy) NSString * kaicangPrice;
@property (nonatomic, copy) NSString * currtentPrice;
@property (nonatomic, copy) NSString * direction;
@property (nonatomic, copy) NSString * type;//持仓列表/历史仓位
@property (nonatomic, copy) NSString * instrument;
@end

NS_ASSUME_NONNULL_END