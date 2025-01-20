import { UserProfilePics } from "@/types/story";
import UserItemCarousel from "@components/carousel/UserItemCarousel";
import * as React from "react";
import { useState } from "react";
import { useWindowDimensions } from "react-native";
import Carousel from "react-native-reanimated-carousel";

interface StackCarouselProps {
  data: UserProfilePics[];
  enabled?: boolean;
}

const StackCarousel = ({ data, enabled = true }: StackCarouselProps) => {
  const { width, height } = useWindowDimensions();

  const PAGE_WIDTH = width;
  const PAGE_HEIGHT = height * 0.55;

  const [isScrolling, setIsScrolling] = useState(false);

  return (
    <Carousel
      enabled={enabled}
      vertical={false}
      mode="parallax"
      width={PAGE_WIDTH}
      height={PAGE_HEIGHT}
      data={data}
      renderItem={({ item: story, index }) => (
        <UserItemCarousel
          key={index}
          userProfilePics={story}
          dimensions={{ width, height: height * 1.1 }}
          isScrolling={isScrolling}
        />
      )}
      onScrollBegin={() => {
        setIsScrolling(false);
      }}
      onScrollEnd={() => {
        setTimeout(() => {
          setIsScrolling(true);
        }, 100);
      }}
      loop={data.length > 1}
    />
  );
};

export default StackCarousel;
