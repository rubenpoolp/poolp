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
import TabBarIcon from "@components/TabBarIcon";
import { TabBarPages } from "@config/tabBarPages";

const Tab = createBottomTabNavigator();

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
        tabBarIcon: ({ focused }) => (
          <TabBarIcon focused={focused} route={route} />
        ),
      })}
    >
      {TabBarPages.map((tab) => (
        <Tab.Screen key={tab.name} name={tab.name} component={tab.component} />
      ))}
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
