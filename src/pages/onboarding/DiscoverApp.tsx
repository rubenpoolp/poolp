import assets from "@assets/index";

import OnboardingCarousel from "@components/OnboardingCarousel";
import MyOnboardingLayout from "@pages/onboarding/MyOnboardingLayout";
import React, { useState } from "react";
import { View } from "react-native";

export interface CarouselItem {
  title: string;
  description: string;
  picture: any;
}

const OnboardingCarouselContent: CarouselItem[] = [
  {
    title: "onboarding.discoverApp.item1.title",
    description: "onboarding.discoverApp.item1.description",
    picture: assets.onboarding1,
  },
  {
    title: "onboarding.discoverApp.item2.title",
    description: "onboarding.discoverApp.item2.description",
    picture: assets.onboarding2,
  },
  {
    title: "onboarding.discoverApp.item3.title",
    description: "onboarding.discoverApp.item3.description",
    picture: assets.onboarding3,
  },
  {
    title: "onboarding.discoverApp.item4.title",
    description: "onboarding.discoverApp.item4.description",
    picture: assets.onboarding4,
  },
];

interface DiscoverAppProps {
  navigation: any;
  route: any;
}

const DiscoverApp = ({ navigation, route }: DiscoverAppProps) => {
  const { user, nextScreen } = route.params;
  const [isLastItem, setIsLastItem] = useState(false);

  const handleNext = () => {
    navigation.navigate(nextScreen, { user });
  };

  const handleSkip = () => {
    navigation.navigate(nextScreen, { user });
  };

  const handleIndexChange = (index: number) => {
    setIsLastItem(index === OnboardingCarouselContent.length - 1);
  };

  return (
    <MyOnboardingLayout
      onNextPress={handleNext}
      logoSize="small"
      canGoBack={false}
      title="onboarding.discoverApp.title"
      disableNextButton={!isLastItem}
      onSkipPress={handleSkip}
    >
      <View className="flex-1 justify-center items-center">
        <OnboardingCarousel
          items={OnboardingCarouselContent}
          onIndexChange={handleIndexChange}
        />
      </View>
    </MyOnboardingLayout>
  );
};

export default DiscoverApp;
