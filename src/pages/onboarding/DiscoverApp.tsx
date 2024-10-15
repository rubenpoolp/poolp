import assets from "@assets/index";
import OnboardingCarouselItem from "@components/OnboardingCarouselItem";
import MyOnboardingLayout from "@pages/onboarding/MyOnboardingLayout";
import React from "react";
import { View } from "react-native";

const OnboardingCarouselContent = [
  {
    title: "onboarding.discoverApp.item1.title",
    description: "onboarding.discoverApp.item1.description",
    picture: assets.onboarding1,
  },
  {
    title: "onboarding.discoverApp.item2.title",
    description: "onboarding.discoverApp.item2.description",
    picture: assets.onboarding1,
  },
  {
    title: "onboarding.discoverApp.item3.title",
    description: "onboarding.discoverApp.item3.description",
    picture: assets.onboarding1,
  },
  {
    title: "onboarding.discoverApp.item4.title",
    description: "onboarding.discoverApp.item4.description",
    picture: assets.onboarding1,
  },
];

interface DiscoverAppProps {
  navigation: any;
  route: any;
}

const DiscoverApp = ({ navigation, route }: DiscoverAppProps) => {
  const { user, nextScreen } = route.params;

  const handleNext = () => {
    navigation.navigate(nextScreen, { user });
  };

  return (
    <MyOnboardingLayout
      onNextPress={handleNext}
      logoSize="small"
      canGoBack={false}
      title="onboarding.discoverApp.title"
      disableNextButton={true}
    >
      {/* <GestureHandlerRootView style={{ flex: 1 }}> */}
      <View className="flex-1">
        <OnboardingCarouselItem
          title="onboarding.discoverApp.item1.title"
          description="onboarding.discoverApp.item1.description"
          picture={assets.onboarding1}
        />
      </View>
      {/* </GestureHandlerRootView> */}
    </MyOnboardingLayout>
  );
};

export default DiscoverApp;
