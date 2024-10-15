import colors from "@config/colors";
import Circles from "@pages/circles/Circles";
import CameraPage from "@pages/takePicture/Camera";
import Home from "@pages/home/Home";
import Profile from "@pages/profile/Profile";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Camera, IntersectThree, UserFocus } from "phosphor-react-native";
import React from "react";
import { View } from "react-native";

const Tab = createBottomTabNavigator();

const Tabs = [
  { name: "Home", component: Home, Icon: UserFocus },
  { name: "Circles", component: Circles, Icon: IntersectThree },
  { name: "Camera", component: CameraPage, Icon: Camera },
  { name: "Profile", component: Profile, Icon: IntersectThree },
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
          const tab = Tabs.find((t) => t.name === route.name);
          if (!tab) return null;

          return (
            <View className="items-center">
              <tab.Icon size={24} color={colors.light} />
              {focused && (
                <View className="absolute -bottom-[10px] w-[28px] h-[1px] bg-light" />
              )}
            </View>
          );
        },
      })}
    >
      {Tabs.map((tab) => (
        <Tab.Screen key={tab.name} name={tab.name} component={tab.component} />
      ))}
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
