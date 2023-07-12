import React from "react";

import { NAVIGATION_TEST_SCREEN } from "constants/router.constant";
import { useSystem } from "helpers/system.helper";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


import TestScreen from "screens/test/test.screen";

const NativeStack = createNativeStackNavigator();

const MainStackNavigation = () => {
  const { theme } = useSystem();

  return (
    <NativeStack.Navigator
      initialRouteName={NAVIGATION_TEST_SCREEN}
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.background
        },
        headerTitleAlign: "center",
        headerTintColor: theme.text,
        animation: "slide_from_right",
        headerBackTitle: ""
      }}
    >
      <NativeStack.Screen name={NAVIGATION_TEST_SCREEN} component={TestScreen} options={{headerTitle: "Test"}}/>

      {/*Thêm các màn hình hoặc tab, drawer tại đây*/}
    </NativeStack.Navigator>
  );
};

export default MainStackNavigation;
