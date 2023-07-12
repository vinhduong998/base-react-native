import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {NAVIGATION_HOME_SCREEN} from "constants/router.constant";
import React from "react";
import {useSystem} from "helpers/system.helper";
import {Device} from "ui/device.ui";
import {FontSizes, MHS, VS} from "ui/sizes.ui";
import {Shadow2} from "ui/shadow.ui";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigation() {
    const {theme} = useSystem();


    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarActiveTintColor: theme.btnActive,
                tabBarInactiveTintColor: `${theme.text}60`,
                tabBarLabelStyle: {
                    marginBottom: Device.isIos ? "auto" : VS._10,
                    fontSize: FontSizes._11,
                    fontWeight: "bold"
                },
                headerStyle: {
                    backgroundColor: theme.background
                },
                headerTitleAlign: "center",
                headerTintColor: theme.text,
                gestureEnabled: false,
                animation: "slide_from_right",
                headerBackTitle: "",
                tabBarStyle: {
                    backgroundColor: theme.background,
                    // borderTopLeftRadius: MHS._20,
                    // borderTopRightRadius: MHS._20,
                    alignItems: "center",
                    paddingVertical: MHS._6,
                    height: VS._60,
                    ...Shadow2
                },
                // tabBarIcon: ({focused, color}) => {
                //     let Icon: any;
                //
                //     switch (route.name) {
                //         case NAVIGATION_HOME_SCREEN: {
                //             Icon = <IconLaw size={FontSizes._24} color={color}/>;
                //             break;
                //         }
                //         case NAVIGATION_SETTINGS_SCREEN: {
                //             Icon = <IconSettingUser width={FontSizes._24} height={FontSizes._24} color={color}/>;
                //             break;
                //         }
                //         case NAVIGATION_LAWYER_DIRECTORY_SCREEN: {
                //             Icon = <IconListLawyers size={FontSizes._24} color={color}/>;
                //             break;
                //         }
                //         default: {
                //             Icon = <IconCommunity size={FontSizes._24} color={color}/>;
                //             break;
                //         }
                //     }
                //     return (
                //         <View>
                //             {Icon}
                //         </View>
                //     );
                // }
            })}
            initialRouteName={NAVIGATION_HOME_SCREEN}
        >
            {/*<Tab.Screen*/}
            {/*    options={{*/}
            {/*        tabBarLabel: "Home"*/}
            {/*    }}*/}
            {/*    name={NAVIGATION_HOME_SCREEN} component={HomeScreen} />*/}
            {/*{isUS && <Tab.Screen*/}
            {/*    options={{*/}
            {/*        headerShown: false,*/}
            {/*        tabBarLabel: "Lawyers"*/}
            {/*    }}*/}
            {/*    name={NAVIGATION_LAWYER_DIRECTORY_SCREEN} component={ListLawyerScreen} />}*/}
            {/*<Tab.Screen*/}
            {/*    options={{*/}
            {/*        headerShown: false,*/}
            {/*        tabBarLabel: "Community"*/}
            {/*    }}*/}
            {/*    name={NAVIGATION_COMMUNITY_SCREEN} component={ListCommunityScreen} />*/}
            {/*<Tab.Screen*/}
            {/*    name={NAVIGATION_SETTINGS_SCREEN}*/}
            {/*    component={SettingsScreen}*/}
            {/*    options={() => ({*/}
            {/*        tabBarLabel: "Setting",*/}
            {/*        headerShown: false*/}
            {/*    })}*/}
            {/*/>*/}
        </Tab.Navigator>
    );
}
