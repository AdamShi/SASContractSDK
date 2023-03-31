//
//  SASContractSDK.h
//  SASContractSDK
//
//  Created by AdamShi on 2022/8/26.
//

#import <Foundation/Foundation.h>
#import "SASContractSDKConfig.h"


NS_ASSUME_NONNULL_BEGIN

typedef NS_ENUM(NSUInteger, SASContractColorMode) {
    SASContractColorModeWhite,
    SASContractColorModeDark,
};

@protocol SASContractSDKDelegate <NSObject>
@required
- (void)contractSDKLoginAction;
- (void)contractSDKRechargeAction;
@end

@interface SASContractSDKManager : NSObject

/**
 SDK language code, Currently supports three languages
 English:        @"en"
 Chinese:       @"zh-Hans"
 Korean:        @"ko"
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

+ (instancetype)sharedSDK;
+ (void)setupSDKWith:(SASContractSDKConfig *)config;
- (UIViewController *)SASContractSDKViewController;

- (void)loginWith:(NSString *)sfg6;
- (void)logout;

- (void)kLineReSubscribe;
- (void)kLineCancelSubscribe;

- (instancetype)init NS_UNAVAILABLE;
+ (instancetype)new NS_UNAVAILABLE;
@end

NS_ASSUME_NONNULL_END
