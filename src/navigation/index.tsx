import React, { useEffect, useRef } from "react";

import setupAxiosInterceptors from "configs/axios.config";
import { useAppSelector } from "configs/store.config";
import { DEEP_LINK, EnumTheme } from "constants/system.constant";
import { navigationRef } from "helpers/navigation.helper";
import { usePurchase } from "helpers/purchase.helper";
import { PRODUCTS, SUBSCRIPTIONS } from "helpers/system.helper";
import { languages } from "languages";
import { StatusBar, StyleSheet, View } from "react-native";
import ErrorBoundary from "react-native-error-boundary";
import { setupColorForSoftMenuBar } from "ui/device.ui";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import RNBootSplash from "react-native-bootsplash";
import { logScreenToFirebase } from "helpers/analytics.helper";
import { NAVIGATION_MAIN_STACK } from "constants/router.constant";
import MainStackNavigation from "navigation/mainStack.navigation";

setupAxiosInterceptors((status: number) => {
  switch (status) {
    case 401:
      // GlobalPopupHelper.showPopupRequestLogin()
      break;
    case 403:
      // GlobalPopupHelper.showPopupNoPermission()
      break;
  }
});


const NativeStack = createNativeStackNavigator();


function AppNavigation() {
  const language = useAppSelector(state => state.system.language);
  const theme = useAppSelector(state => state.system.theme);
  const routeNameRef = useRef<any>();
  // const appState = useRef(AppState.currentState);

  /**
   * Logtime sử dụng
   */
  // const pointTime = useRef(new Date().getTime());

  const { initIAP } = usePurchase(false);

  useEffect(() => {
    setupColorForSoftMenuBar(theme);
  }, [theme]);

  useEffect(() => {
    /**
     * Gọi lấy config
     */
    // getConfig();

    /**
     * Đăng ký check state, có thể logtime
     */
    // const subscriptionAppState = AppState.addEventListener("change", handleAppStateChange);
    // return () => {
    //     subscriptionAppState.remove();
    // };

    /**
     * Load trước các gói purchase
     */
    initIAP({ subscriptionIds: SUBSCRIPTIONS, productIds: PRODUCTS });
  }, []);


  useEffect(() => {
    languages.setLanguage(language);
  }, [language]);

  /**
   * Đăng ký check state, logtime
   */
  // const handleAppStateChange = useCallback(async (nextAppState: AppStateStatus) => {
  //     if (appState.current.match(/inactive|background/) && nextAppState === "active") {
  //         pointTime.current = new Date().getTime();
  //     }
  //
  //     if (appState.current.match(/active/) && (nextAppState === "inactive" || nextAppState === "background")) {
  //         console.log(navigationHelper.getRouteName() + " state được dùng trong " + dayjs(new Date()).diff(pointTime.current, "second"), "second");
  //         sendEventToLogTime({
  //             user_id: account?.user_id ? account?.user_id : (accountAnonymous?._id || ""),
  //             session_id: SESSION_ID,
  //             time_start: pointTime.current,
  //             time_end: new Date().getTime(),
  //             time_active: dayjs(new Date()).diff(pointTime.current, "second"),
  //             screen: routeNameRef.current,
  //             device_id: await DeviceInfo.getUniqueId(),
  //             type_action: "system",
  //             version: DeviceInfo.getVersion()+"-"+DeviceInfo.getBuildNumber()
  //         });
  //         pointTime.current = new Date().getTime();
  //     }
  //
  // }, [account, accountAnonymous, countryDetect, loc]);

  return (
    <View style={styles.container}>
      <NavigationContainer ref={navigationRef}
                           linking={{
                             prefixes: [`${DEEP_LINK}://`]
                           }}
                           onReady={() => {
                             /**
                              * Đăng ký check state, logtime
                              */
                             // pointTime.current = new Date().getTime();
                             routeNameRef.current = navigationRef.current?.getCurrentRoute()?.name;

                             logScreenToFirebase(routeNameRef.current, routeNameRef.current);
                             RNBootSplash.hide({ fade: false });
                           }}
                           onStateChange={async () => {
                             const previousRouteName = routeNameRef.current;
                             const currentRouteName = navigationRef.current?.getCurrentRoute()?.name;

                             /**
                              * Đăng ký check state, logtime
                              */
                             // console.log(previousRouteName + " được dùng trong " + dayjs(new Date()).diff(pointTime.current, "second"), "second");
                             //
                             // if(!__DEV__){
                             //     sendEventToLogTime({
                             //         user_id: account?.user_id ? account?.user_id : (accountAnonymous?._id || ""),
                             //         session_id: SESSION_ID,
                             //         time_start: pointTime.current,
                             //         time_end: new Date().getTime(),
                             //         time_active: dayjs(new Date()).diff(pointTime.current, "second"),
                             //         screen: routeNameRef.current,
                             //         device_id: await DeviceInfo.getUniqueId(),
                             //         type_action: "navigate",
                             //         version: DeviceInfo.getVersion()+"-"+DeviceInfo.getBuildNumber(),
                             //     });
                             // }

                             // pointTime.current = new Date().getTime();

                             if (previousRouteName !== currentRouteName && !__DEV__) {
                               logScreenToFirebase(currentRouteName || "", currentRouteName || "");
                             }
                             routeNameRef.current = currentRouteName;
                           }}>
        <StatusBar barStyle={theme == EnumTheme.Dark ? "light-content" : "dark-content"} translucent={true}
                   backgroundColor={"transparent"} />
        <ErrorBoundary>
          <NativeStack.Navigator
            screenOptions={{
              animation: "slide_from_right"
            }}>
            <NativeStack.Screen
              name={NAVIGATION_MAIN_STACK}
              component={MainStackNavigation}
              options={{
                headerShown: false
              }}
            />
          </NativeStack.Navigator>
        </ErrorBoundary>
      </NavigationContainer>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default AppNavigation;
