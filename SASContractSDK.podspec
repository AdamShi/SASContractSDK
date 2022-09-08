#
# Be sure to run `pod lib lint SASContractSDK.podspec' to ensure this is a
# valid spec before submitting.
#
# Any lines starting with a # are optional, but their use is encouraged
# To learn more about a Podspec see https://guides.cocoapods.org/syntax/podspec.html
#

Pod::Spec.new do |s|
  s.name             = 'SASContractSDK'
  s.version          = '0.1.20'
  s.summary          = 'This is SASContractSDK. Includes KLines, Contract Deals'

# This description is used to generate tags and improve search results.
#   * Think: What does it do? Why did you write it? What is the focus?
#   * Try to keep it short, snappy and to the point.
#   * Write the description between the DESC delimiters below.
#   * Finally, don't worry about the indent, CocoaPods strips it!

  s.description      = <<-DESC
TODO: Add long description of the pod here. Add some Description
                       DESC

  s.homepage         = 'https://github.com/AdamShi/SASContractSDK'
  # s.screenshots     = 'www.example.com/screenshots_1', 'www.example.com/screenshots_2'
  s.license          = { :type => 'MIT', :file => 'LICENSE' }
  s.author           = { 'shiyadong666' => 'shiyadong666@163.com' }
  s.source           = { :git => 'https://github.com/AdamShi/SASContractSDK.git', :tag => s.version.to_s }
  # s.social_media_url = 'https://twitter.com/<TWITTER_USERNAME>'

  s.ios.deployment_target = '10.0'
  s.swift_version = '5.0'
  
  s.vendored_frameworks = 'Frameworks/SASContractSDK.xcframework'
  
  s.libraries  = 'resolv', 'icucore', 'c++', 'z', 'z.1.2.8', 'xml2.2'
  s.frameworks = 'UIKit', 'Foundation', 'Security', 'SystemConfiguration', 'CoreMotion', 'CoreTelephony', 'AdSupport', 'CoreLocation', 'CoreFoundation', 'CoreText'

  s.dependency 'Masonry'##, '1.1.0'
  s.dependency 'MJExtension'##, '3.2.4'
  s.dependency 'MJRefresh'##, '3.5.0'
  s.dependency 'MBProgressHUD'##, '1.2.0'
  s.dependency 'YYModel'##, '1.0.4'
  s.dependency 'IQKeyboardManager'##, '6.5.10'
  s.dependency 'ReactiveCocoa','2.5'
  s.dependency 'JXCategoryView'##, '1.6.0'
  s.dependency 'SwiftEntryKit'##, '2.0.0'
  s.dependency 'SocketRocket'##, '0.6.0'
  s.dependency 'LYEmptyView'##, '1.3.1'
  s.dependency 'AFNetworking'##, '4.0.1'
  s.dependency 'SVGKit'##, '3.0.0'
  s.dependency 'YYCache'##, '1.0.4'
  s.dependency 'SDWebImage'##, '5.10.2'
  
  s.user_target_xcconfig  =  {
      'OTHER_LDFLAGS'  =>  ['$(inherited)','-ObjC'],
      'BUILD_LIBRARY_FOR_DISTRIBUTION' => 'YES',
#      'ENABLE_BITCODE' => 'NO',
      'CLANG_MODULES_AUTOLINK' => 'YES',
#      'VALID_ARCHS' => 'x86_64 armv7 arm64',
#      'VALID_ARCHS[sdk=iphonesimulator*]' => '',
#      'VALID_ARCHS[sdk=iphonesimulator*]' => 'arm64',
#      'EXCLUDED_ARCHS[sdk=iphonesimulator*]' => 'arm64',
#      'CLANG_ALLOW_NON_MODULAR_INCLUDES_IN_FRAMEWORK_MODULES' => 'YES'
  }
  s.pod_target_xcconfig = {
      'OTHER_LDFLAGS'  =>  ['$(inherited)','-ObjC'],
      'BUILD_LIBRARY_FOR_DISTRIBUTION' => 'YES',
#      'ENABLE_BITCODE' => 'NO',
      'CLANG_MODULES_AUTOLINK' => 'YES',
#      'VALID_ARCHS' => 'x86_64 armv7 arm64',
#      'VALID_ARCHS[sdk=iphonesimulator*]' => '',
#      'VALID_ARCHS[sdk=iphonesimulator*]' => 'arm64',
#      'EXCLUDED_ARCHS[sdk=iphonesimulator*]' => 'arm64',
#      'CLANG_ALLOW_NON_MODULAR_INCLUDES_IN_FRAMEWORK_MODULES' => 'YES'
  }
  

end
