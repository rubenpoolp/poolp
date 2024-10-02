import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Components
import LoaderScreen from "@src/pages/LoaderScreen";
import { Introduction } from "@src/pages/onboarding/Introduction";
import Name from "@src/pages/onboarding/Name";
import HomeStackNavigator from "@src/pages/navigation/HomeStackNavigator";
import MyScreen from "@src/components/MyScreen";

const OnboardingStack = createNativeStackNavigator();

const OnboardingViews = [
  { name: "Loader", component: LoaderScreen },
  { name: "Introduction", component: Introduction },
  { name: "Name", component: Name },
  { name: "HomeStack", component: HomeStackNavigator },
];

const OnboardingStackNavigator = () => {
  return (
    <OnboardingStack.Navigator screenOptions={{ headerShown: false }}>
      {OnboardingViews.map((view) => (
        <OnboardingStack.Screen
          key={view.name}
          name={view.name}
          component={view.component}
        />
      ))}
    </OnboardingStack.Navigator>
  );
};

export default OnboardingStackNavigator;
