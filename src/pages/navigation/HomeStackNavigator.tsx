import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Home from "../home/Home";
import Profile from "../profile/Profile";

const HomeStack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="Profile" component={Profile} />
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;
