import { CarouselItem } from "@pages/onboarding/Introduction";
import React, { useState } from "react";
import { Dimensions, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Carousel from "react-native-reanimated-carousel";
import CarouselPagination from "./CarouselPagination";
import OnboardingCarouselItem from "./OnboardingCarouselItem";

interface OnboardingCarouselProps {
  items: CarouselItem[];
  onIndexChange: (index: number) => void;
}

const OnboardingCarousel: React.FC<OnboardingCarouselProps> = ({
  items,
  onIndexChange,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const width = Dimensions.get("window").width;
  const scrollDuration = 500;

  const handleProgressChange = (_: any, absoluteProgress: number) => {
    const newIndex = Math.round(absoluteProgress);
    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex);
      onIndexChange(newIndex);
    }
  };

  return (
    <GestureHandlerRootView className="flex-1 items-center justify-center">
      <View className="h-[88%]">
        <Carousel
          loop={false}
          width={width}
          data={items}
          scrollAnimationDuration={scrollDuration}
          onProgressChange={handleProgressChange}
          renderItem={({ item }: { item: CarouselItem }) => (
            <OnboardingCarouselItem
              title={item.title}
              description={item.description}
              picture={item.picture}
            />
          )}
        />
      </View>
      <CarouselPagination
        duration={scrollDuration}
        itemsCount={items.length}
        currentIndex={currentIndex}
      />
    </GestureHandlerRootView>
  );
};

export default OnboardingCarousel;
