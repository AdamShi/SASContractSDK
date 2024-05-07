#
# Be sure to run `pod lib lint SASContractSDK.podspec' to ensure this is a
# valid spec before submitting.
#
# Any lines starting with a # are optional, but their use is encouraged
# To learn more about a Podspec see https://guides.cocoapods.org/syntax/podspec.html
#

Pod::Spec.new do |s|
  s.name             = 'SASContractSDK'
  s.version          = '1.3.5'
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

  #s.swift_version = '5.0'
  s.static_framework = true
  s.ios.deployment_target = '12.0'
  s.vendored_frameworks = 'SASContractSDK/SASContractSDK.xcframework'
  s.resources = [
      'SASContractSDK/SASResources/**/*'
  ]
  
  #s.libraries  = 'resolv', 'icucore', 'c++', 'z', 'z.1.2.8', 'xml2.2'
  #s.frameworks = 'UIKit', 'Foundation', 'Security', 'SystemConfiguration', 'CoreMotion', 'CoreTelephony', 'AdSupport', 'CoreLocation', 'CoreFoundation', 'CoreText'

  s.dependency 'AFNetworking'##, '4.0.1'
  s.dependency 'BeeHive'##, '1.6.0'
  s.dependency 'CWLateralSlide'##, '1.6.5'
  s.dependency 'DZNEmptyDataSet'##, '1.8.1'
  s.dependency 'IQKeyboardManager', '6.5.10'
  s.dependency 'JXCategoryView'##, '1.6.1'
  s.dependency 'lottie-ios', '2.5.3'
  s.dependency 'LYEmptyView'##, '1.3.1'
  s.dependency 'Masonry'##, '1.1.0'
  s.dependency 'MBProgressHUD'##, '1.2.0'
  s.dependency 'MJExtension'##, '3.2.4'
  s.dependency 'MJRefresh'##, '3.5.0'
  s.dependency 'pop'##, '1.0.10'
  s.dependency 'ReactiveCocoa','2.5'
  s.dependency 'SASOverlay'##, '1.0.1'
  s.dependency 'SDWebImage'##, '5.15.5'
  s.dependency 'SocketRocket'##, '0.6.0'
  s.dependency 'SVGKit'##, '3.0.0'
  s.dependency 'YYModel'##, '1.0.4'
  s.dependency 'YYCache'##, '1.0.4'

  s.pod_target_xcconfig = {
      'VALID_ARCHS' => 'x86_64 arm64',
      'OTHER_LDFLAGS'  =>  ['$(inherited)','-ObjC'],
      #'BUILD_LIBRARY_FOR_DISTRIBUTION' => 'YES',
      #'OTHER_SWIFT_FLAGS' => ['-Xfrontend','-module-interface-preserve-types-as-written'],
  }
  

end
