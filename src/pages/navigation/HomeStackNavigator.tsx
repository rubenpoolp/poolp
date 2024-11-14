import PastCirclesDetails from "@pages/circles/PastCircleDetails";
import PastCircles from "@pages/circles/PastCircles";
import Home from "@pages/home/Home";
import BottomTabNavigator from "@pages/navigation/BottomTabNavigator";
import ProfilePicture from "@pages/profile/ProfilePicture";
import WhoLikedYou from "@pages/profile/WhoLikedYou";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
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
      <HomeStack.Screen name="ProfilePicture" component={ProfilePicture} />
      <HomeStack.Screen name="WhoLikedYou" component={WhoLikedYou} />
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;
