import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Home from "@pages/home/Home";
import PastCircles from "@pages/circles/PastCircles";
import PastCirclesDetails from "@pages/circles/PastCircleDetails";
import BottomTabNavigator from "@pages/navigation/BottomTabNavigator";
const HomeStack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen
        name="BottomTabNavigator"
        component={BottomTabNavigator}
      />
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="PastCircles" component={PastCircles} />
      <HomeStack.Screen
        name="PastCircleDetails"
        component={PastCirclesDetails}
      />
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;
