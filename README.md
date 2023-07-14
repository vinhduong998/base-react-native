#0.71.4

##Quy tắc
###Tên
####Biến, hàm
```angular2html
- interface là Typed... (TypedUser)
- interface prop là Typed...Props (TypedUserDetailProps)
- let hoặc const object có thể sửa đổi viết danh từ camelCase (myObject)
- enum là Enum..., giá trị viết PascalCace (EnumGender, EnumGender.Male)
- biến hardcode viết hoa SNAKE_CASE (DATA_USER)
- state bắt đầu là danh từ, camelCase ([name,setName])
- hàm bắt đầu động tự, camelCase (getItem)
- side effect bắt đầu bằng on... (onCallBack, onLoad)
- ref bắt đầu bằng ref... (refList)
- value re-animated bắt đầu bằng ani... (aniScrollX = useSharedValue(0);)
- re-animated style bắt đầu bằng aniStyle... (const aniStyleColorName = useAnimatedStyle)
```
####Style
```angular2html
- style component bao cả file: container
- style component bao nội dun phân biệt là container... (containerItem)
- style cho nút là btn... (btnDelete)
- style cho text là txt... (txtSkip)
- style cho view là view... (viewItem)
- style cho icon là ic... (viewItem)
- style cho ảnh là img... (imgAvatar)
- style cho view phân cách là stroke... (strokeHeader)
```


##@gorhom/bottom-sheet
- note
##@invertase/react-native-apple-authentication
- note
##@notifee/react-native
- note
##@react-native-community/clipboard
- note
##@react-native-community/hooks
- note
##@react-native-community/netinfo
- note
##@react-native-firebase/analytics
- note
##@react-native-firebase/app
- note
##@react-native-firebase/crashlytics
- note
##@react-native-firebase/firestore
- note
##@react-native-firebase/messaging
- note
##@react-native-google-signin/google-signin
- note
##@react-native-masked-view/masked-view
- note
##@react-navigation/bottom-tabs
- note
##@react-navigation/native
- note
##@react-navigation/native-stack
- note
##@react-navigation/stack
- note
##@reduxjs/toolkit
- note
##@shopify/flash-list
- note
##axios
- note
##dayjs
- note
##jwt-encode
- note
##libphonenumber-js
- note
##lottie-react-native
- note
##md5
- note
##patch-package
- note
##react
- note
##react-fast-compare
- note
##react-native
- note
##react-native-admob-native-ads
- note
##react-native-appsflyer
- note
##react-native-background-timer
- note
##react-native-blurhash
- note
##react-native-bootsplash
- note
##react-native-code-push
- note
##react-native-config
- note
##react-native-date-picker
- note
##react-native-device-country
- note
##react-native-device-info
- note
##react-native-error-boundary
- note
##react-native-fast-image
- note
##react-native-fs
- note
##react-native-gesture-handler
- note
##react-native-get-random-values
- note
##react-native-google-mobile-ads
- Chỉnh sửa app id admob tại app.json
##react-native-hyperlink
- note
##react-native-iap
- note
##react-native-image-picker
- note
##react-native-image-zoom-viewer
- note
##react-native-in-app-review
- note
##react-native-keyboard-aware-scroll-view
- note
##react-native-linear-gradient
- note
##react-native-localization
- note
##react-native-markdown-display
- note
##react-native-mmkv
- note
##react-native-modal
- note
##react-native-permissions
- note
##react-native-reanimated
- note
##react-native-safe-area-context
- note
##react-native-safearea-height
- note
##react-native-screens
- note
##react-native-sha1
- note
##react-native-share
- note
##react-native-simple-toast
- note
##react-native-sqlite-storage
- note
##react-native-svg
- note
##react-native-typewriter
- note
##react-native-vector-icons
- note
##react-native-video
- note
##react-redux
- note
##redux
- note
##redux-logger
- note
##redux-persist
- note
##sp-react-native-in-app-updates
- note
##uuid
- note


- Tạo firebase, lấy file google-services.json
- Sửa appid trong dòng 6 file package.json
- Sửa android_app_id trong app.json
- Thay icono android
- Tạo key
  keytool -genkey -v -keystore my-release-key.keystore -alias alias_name -keyalg RSA -keysize 2048 -validity 10000

