//
//  SASContractSDKConfig.h
//  SASContractSDK
//
//  Created by AdamShi on 2022/8/21.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface SASContractSDKConfig : NSObject
@property (nonatomic, copy) NSString *apiURL;       // HTTP服务器地址
@property (nonatomic, copy) NSString *socketURL;    // Socket服务器地址
@property (nonatomic, copy) NSString *k5fu3;        // 渠道商代码

@end

NS_ASSUME_NONNULL_END
