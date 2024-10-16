import * as React from "react";
import { useWindowDimensions } from "react-native";
import {
  Extrapolation,
  interpolate,
  useSharedValue,
} from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import UserItemCarousel from "@components/carousel/UserItemCarousel";

interface StackCarouselProps {
  data: any[];
  enabled?: boolean;
}

const StackCarousel = ({ data, enabled = true }: StackCarouselProps) => {
  const { width, height } = useWindowDimensions();

  const PAGE_WIDTH = width;
  const PAGE_HEIGHT = height * 0.6;

  const directionAnimVal = useSharedValue(0);

  const animationStyle = React.useCallback(
    (value: number) => {
      "worklet";
      const translateY = interpolate(value, [0, 1], [0, -18]);

      // Ajout d'un décalage constant vers la droite
      // Ajustez cette valeur pour augmenter ou diminuer le décalage
      const baseTranslateX = 40;

      const translateX =
        interpolate(value, [-1, 0], [PAGE_WIDTH, 0], Extrapolation.CLAMP) *
          directionAnimVal.value +
        baseTranslateX * value; // Ajoute un décalage progressif

      const rotateZ =
        interpolate(value, [-1, 0], [15, 0], Extrapolation.CLAMP) *
        directionAnimVal.value;

      const zIndex = interpolate(
        value,
        [0, 1, 2, 3, 4],
        [0, 1, 2, 3, 4].map((v) => (data.length - v) * 10),
        Extrapolation.CLAMP,
      );

      //   const scale = interpolate(value, [0, 1], [1, 0.95]);

      const opacity = interpolate(
        value,
        [-1, -0.8, 0, 1],
        [0, 0.9, 1, 0.85],
        Extrapolation.EXTEND,
      );

      return {
        transform: [
          { translateY },
          { translateX },
          { rotateZ: `${rotateZ}deg` },
          //   { scale },
        ],
        zIndex,
        opacity,
      };
    },
    [PAGE_HEIGHT, PAGE_WIDTH],
  );

  return (
    <Carousel
      enabled={enabled}
      vertical={false}
      width={PAGE_WIDTH}
      height={PAGE_HEIGHT}
      data={data}
      renderItem={({ index, item }) => (
        <UserItemCarousel
          key={index}
          user={item}
          dimensions={{ width, height }}
        />
      )}
      customAnimation={animationStyle}
      windowSize={3}
    />
  );
};

export default StackCarousel;
