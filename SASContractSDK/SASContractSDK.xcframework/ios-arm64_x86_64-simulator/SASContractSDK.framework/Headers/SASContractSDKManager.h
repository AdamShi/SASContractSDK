//
//  SASContractSDK.h
//  SASContractSDK
//
//  Created by AdamShi on 2022/8/26.
//

#import <Foundation/Foundation.h>
#import "SASContractSDKConfig.h"
#import "CFDProfitShareModel.h"

NS_ASSUME_NONNULL_BEGIN

typedef NS_ENUM(NSUInteger, SASContractColorMode) {
    SASContractColorModeWhite,
    SASContractColorModeDark,
};

@interface SASContractSDKPerpetualAssetModel : NSObject
@property(nonatomic, copy) NSString *available;
@property(nonatomic, copy) NSString *freeze;
@property(nonatomic, copy) NSString *totalProfit;
@property(nonatomic, copy) NSString *totalMargin;
@end

@protocol SASContractSDKDelegate <NSObject>
@required
- (void)contractSDKLoginAction;
- (void)contractSDKRechargeAction;
- (void)contractSDKProfitShareActionWithModel:(CFDProfitShareModel *)model;
@end

@interface SASContractSDKManager : NSObject

/**
 SDK language code, Currently supports 18 languages
 @"en",@"zh-Hans", @"zh-Hant", @"ar", @"de", @"es", @"fr", @"it", @"ja", @"ko", @"nb-NO", @"nl-NL", @"pl", @"pt", @"pt-BR", @"ru", @"tr", @"vi-VN"
 */
@property (nonatomic, copy, nullable) NSString *lang;

/**
 Theme color, must be a hexadecimal color value string, e.g: @"#024FFD"
 */
@property (nonatomic, strong) NSString *vicolor;

/**
 Day mode, night mode
 */
@property (nonatomic, assign) SASContractColorMode theme;

/**
 SASContractSDKDelegate
 */
@property (nonatomic, weak) id <SASContractSDKDelegate> delegate;

@property (nonatomic, assign) BOOL allowRotation;

+ (instancetype)sharedInstance;
+ (void)setupSDKWith:(SASContractSDKConfig *)config;
+ (void)resetHost:(SASContractSDKConfig *)config;

- (UIViewController *)perpetualController;
- (UIViewController *)infiniteController;
- (UIViewController *)optionController;
- (UIViewController *)secondController;

- (void)logout;
- (void)loginWith:(NSString *)sfg6 callback:(void(^)(BOOL isSuccess, NSString *errorCode, NSString *errorMsg))callback;

- (void)infiniteNoCashProfitWithCompletion:(void(^)(NSString *result))completion;
- (void)infiniteTransferAmount:(NSString *)num WithCompletion:(void(^)(BOOL isSuccess, NSDictionary *responseDic))completion;

- (void)requestPerpetualAssetDataWithCallback:(void(^)(SASContractSDKPerpetualAssetModel *model, NSString *errorString))callback;

- (instancetype)init NS_UNAVAILABLE;
+ (instancetype)new NS_UNAVAILABLE;
@end

NS_ASSUME_NONNULL_END
