import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Components
import LoaderScreen from "@src/pages/LoaderScreen";
import { Introduction } from "@src/pages/onboarding/Introduction";
import Name from "@src/pages/onboarding/Name";
import HomeStackNavigator from "@src/pages/navigation/HomeStackNavigator";
import Birthday from "@src/pages/onboarding/Birthday";
import Gender from "@src/pages/onboarding/Gender";
import Phone from "@src/pages/onboarding/Phone";
import VerificationCode from "@src/pages/onboarding/VerificationCode";
import Share from "@src/pages/onboarding/Share";

const OnboardingStack = createNativeStackNavigator();

export const OnboardingViews = [
  { name: "Loader", component: LoaderScreen },
  { name: "Introduction", component: Introduction },
  { name: "Name", component: Name },
  { name: "Birthday", component: Birthday },
  { name: "Gender", component: Gender },
  { name: "Phone", component: Phone },
  { name: "VerificationCode", component: VerificationCode },
  { name: "Share", component: Share },
  { name: "HomeStack", component: HomeStackNavigator },
];

export const OnboardingNavigateTo = (
  navigation: any,
  currentScreen: string,
  data?: any,
) => {
  const nextScreen =
    OnboardingViews.findIndex((view) => view.name === currentScreen) + 1;

  return navigation.navigate(OnboardingViews[nextScreen].name, data);
};

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
