import React, { useState } from "react";
import { View, Dimensions } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Carousel from "react-native-reanimated-carousel";
import OnboardingCarouselItem from "./OnboardingCarouselItem";
import { CarouselItem } from "@pages/onboarding/DiscoverApp";

interface OnboardingCarouselProps {
  items: CarouselItem[];
  onIndexChange: (index: number) => void;
}

const OnboardingCarousel: React.FC<OnboardingCarouselProps> = ({
  items,
  onIndexChange,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const width = Dimensions.get("window").width * 0.9;

  const handleProgressChange = (_: any, absoluteProgress: number) => {
    const newIndex = Math.round(absoluteProgress);
    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex);
      onIndexChange(newIndex);
    }
  };

  return (
    <View className="flex-1 justify-center items-center">
      <GestureHandlerRootView>
        <Carousel
          loop={false}
          width={width}
          height={700}
          data={items}
          scrollAnimationDuration={1000}
          onProgressChange={handleProgressChange}
          renderItem={({ item }: { item: CarouselItem }) => (
            <OnboardingCarouselItem
              title={item.title}
              description={item.description}
              picture={item.picture}
            />
          )}
        />
      </GestureHandlerRootView>
    </View>
  );
};

export default OnboardingCarousel;
