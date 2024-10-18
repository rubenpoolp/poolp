import React from "react";
import { View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface CarouselPaginationProps {
  itemsCount: number;
  currentIndex: number;
  duration: number;
}

const PaginationDot: React.FC<{
  index: number;
  animatedIndex: SharedValue<number>;
}> = ({ index, animatedIndex }) => {
  const animatedDotStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      animatedIndex.value,
      [index - 1, index, index + 1],
      [0.5, 1, 0.5],
      Extrapolation.CLAMP,
    );
    const scale = interpolate(
      animatedIndex.value,
      [index - 1, index, index + 1],
      [1, 1.5, 1],
      Extrapolation.CLAMP,
    );
    return {
      opacity,
      transform: [{ scale }],
    };
  });

  return (
    <Animated.View
      className="w-1.5 h-1.5 rounded-full bg-light mx-1"
      style={animatedDotStyle}
    />
  );
};

const CarouselPagination = ({
  itemsCount,
  currentIndex,
  duration,
}: CarouselPaginationProps) => {
  const animatedIndex = useSharedValue(0);

  useDerivedValue(() => {
    animatedIndex.value = withTiming(currentIndex, {
      duration,
    });
  }, [currentIndex]);

  return (
    <View className="flex-row justify-center items-center mt-5">
      {Array.from({ length: itemsCount }).map((_, index) => (
        <PaginationDot
          key={index}
          index={index}
          animatedIndex={animatedIndex}
        />
      ))}
    </View>
  );
};

export default CarouselPagination;
