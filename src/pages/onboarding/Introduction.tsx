import assets from "@assets/index";
import MyPressable from "@components/natives/MyPressable";
import MyText from "@components/natives/MyText";
import OnboardingCarousel from "@components/OnboardingCarousel";
import MyOnboardingLayout from "@pages/onboarding/MyOnboardingLayout";
import React, { useState } from "react";

export interface CarouselItem {
  title: string;
  description: string;
  picture: any;
}

const OnboardingCarouselContent: CarouselItem[] = [
  {
    title: "onboarding.introduction.item1.title",
    description: "onboarding.introduction.item1.description",
    picture: assets.onboarding1,
  },
  {
    title: "onboarding.introduction.item2.title",
    description: "onboarding.introduction.item2.description",
    picture: assets.onboarding2,
  },
  {
    title: "onboarding.introduction.item3.title",
    description: "onboarding.introduction.item3.description",
    picture: assets.onboarding3,
  },
  {
    title: "onboarding.introduction.item4.title",
    description: "onboarding.introduction.item4.description",
    picture: assets.onboarding4,
  },
];

interface IntroductionProps {
  navigation: any;
  route: any;
}

const Introduction = ({ navigation, route }: IntroductionProps) => {
  const { user, nextScreen } = route.params;
  const [isLastItem, setIsLastItem] = useState(false);

  const handleNext = () => {
    navigation.navigate(nextScreen, { user });
  };

  const handleSkip = () => {
    navigation.navigate("HomeStack", { user });
  };

  const handleIndexChange = (index: number) => {
    setIsLastItem(index === OnboardingCarouselContent.length - 1);
  };

  return (
    <MyOnboardingLayout
      onNextPress={handleNext}
      logoSize="small"
      canGoBack={false}
      title="onboarding.introduction.title"
      disableNextButton={!isLastItem}
      skipButton={true}
      onSkipPress={handleNext}
      padding={false}
    >
      <OnboardingCarousel
        items={OnboardingCarouselContent}
        onIndexChange={handleIndexChange}
      />

      {__DEV__ && (
        <MyPressable className="absolute bottom-4 left-6" onPress={handleSkip}>
          <MyText className="text-gray-500">DEV - Skip</MyText>
        </MyPressable>
      )}
    </MyOnboardingLayout>
  );
};

export default Introduction;
