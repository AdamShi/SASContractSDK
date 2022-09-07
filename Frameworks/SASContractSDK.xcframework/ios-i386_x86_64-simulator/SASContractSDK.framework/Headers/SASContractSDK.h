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

@interface SASContractSDK : NSObject

//默认使用的语言版本, 默认为 nil. 将随系统的语言自动改变
//⽬前⽀持的语⾔有，中⽂: zh-Hans, 韩⽂: ko, 英⽂: en
@property (nonatomic, copy, nullable) NSString *lang;
@property (nonatomic, strong) NSString *vicolor;     // VI色,必须是16位色值
@property (nonatomic, assign) SASContractColorMode theme;   // 主题色
@property (nonatomic, weak) id <SASContractSDKDelegate> delegate;

- (instancetype)init NS_UNAVAILABLE;
+ (instancetype)new NS_UNAVAILABLE;

+ (instancetype)sharedSDK;
+ (void)setupSDKWith:(SASContractSDKConfig *)config;

- (UIViewController *)SASContractSDKViewController;
- (void)loginWith:(NSString *)sfg6;
- (void)logout;

- (void)kLineReSubscribe;
- (void)kLineCancelSubscribe;

@end

NS_ASSUME_NONNULL_END
