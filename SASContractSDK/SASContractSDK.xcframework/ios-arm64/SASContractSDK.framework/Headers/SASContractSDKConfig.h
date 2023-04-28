//
//  SASContractSDKConfig.h
//  SASContractSDK
//
//  Created by AdamShi on 2022/8/21.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface SASContractSDKConfig : NSObject
@property (nonatomic, copy) NSString *apiURL;
@property (nonatomic, copy) NSString *socketURL;
@property (nonatomic, copy) NSString *k5fu3; //Channel code

@end

NS_ASSUME_NONNULL_END
