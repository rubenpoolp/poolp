import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoaderScreen from "@src/pages/LoaderScreen";
import Introduction from "@src/pages/introduction/Introduction";
import React from "react";
import HomeStackNavigator from "./HomeStackNavigator";

const OnboardingStack = createNativeStackNavigator();

const OnboardingStackNavigator = () => {
  return (
    <OnboardingStack.Navigator screenOptions={{ headerShown: false }}>
      <OnboardingStack.Screen name="Loader" component={LoaderScreen} />
      <OnboardingStack.Screen name="Introduction" component={Introduction} />
      <OnboardingStack.Screen name="HomeStack" component={HomeStackNavigator} />
    </OnboardingStack.Navigator>
  );
};

export default OnboardingStackNavigator;
