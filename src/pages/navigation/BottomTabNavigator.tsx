import colors from "@config/colors";
import Circles from "@pages/circles/Circles";
import CameraPage from "@pages/takePicture/Camera";
import Home from "@pages/home/Home";
import Profile from "@pages/profile/Profile";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Camera, IntersectThree, UserFocus } from "phosphor-react-native";
import React from "react";
import { View } from "react-native";
import Avatar from "@components/Avatar";

const Tab = createBottomTabNavigator();

const Pages = [
  { name: "Home", component: Home, Icon: UserFocus },
  { name: "Circles", component: Circles, Icon: IntersectThree },
  { name: "Camera", component: CameraPage, Icon: Camera },
  { name: "Profile", component: Profile, Icon: null },
];

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: colors.tabBar.background,
          paddingHorizontal: 40,
        },
        tabBarIcon: ({ focused }) => {
          const tab = Pages.find((t) => t.name === route.name);
          if (!tab) return null;

          if (tab.name === "Profile") {
            return (
              <View className="items-center">
                <Avatar size="sm" disabled={true} />
                {focused && (
                  <View className="absolute -bottom-[10px] w-[28px] h-[1px] bg-light" />
                )}
              </View>
            );
          }

          return (
            <View className="items-center">
              {tab.Icon && <tab.Icon size={24} color={colors.light} />}
              {focused && (
                <View className="absolute -bottom-[10px] w-[28px] h-[1px] bg-light" />
              )}
            </View>
          );
        },
      })}
    >
      {Pages.map((tab) => (
        <Tab.Screen key={tab.name} name={tab.name} component={tab.component} />
      ))}
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
