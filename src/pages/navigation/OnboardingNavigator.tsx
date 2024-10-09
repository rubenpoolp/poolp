import { onboardingRoutes } from "@config/onboardingRoutes";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

// Components

const OnboardingStack = createNativeStackNavigator();

const OnboardingStackNavigator = () => {
  return (
    <OnboardingStack.Navigator screenOptions={{ headerShown: false }}>
      {onboardingRoutes.map((view, index) => (
        <OnboardingStack.Screen
          key={view.name}
          name={view.name}
          component={view.component}
          initialParams={{
            nextScreen:
              index === onboardingRoutes.length - 1
                ? ""
                : onboardingRoutes[index + 1].name,
          }}
        />
      ))}
    </OnboardingStack.Navigator>
  );
};

export default OnboardingStackNavigator;
