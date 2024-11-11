import shadow from "@config/shadow";
import { useEffect, useRef } from "react";
import { Animated, Dimensions, View } from "react-native";
import { Easing } from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";

const { width, height } = Dimensions.get("window");

const Heart = ({ style }: { style: any }) => (
  <Animated.View style={style}>
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="#FF69B4"
      style={shadow.purple}
    >
      <Path
        d="M18.2276 1.74292C17.6747 1.19114 17.0172 0.753107 16.2929 0.453996C15.5686 0.154885 14.7918 0.000595817 14.0071 0C12.5229 0.00024043 11.0929 0.552757 10.0002 1.54815C8.90769 0.55259 7.47762 4.62593e-05 5.99338 0C5.20779 0.000810547 4.43012 0.15557 3.70511 0.455372C2.98011 0.755175 2.32209 1.1941 1.76892 1.74689C-0.590477 4.09496 -0.589474 7.7676 1.77093 10.1057L8.59246 16.8658C9.37201 17.6383 10.6285 17.6383 11.408 16.8658L18.2296 10.1057C20.59 7.7676 20.591 4.09496 18.2276 1.74292Z"
        fill="#A736FF"
      />
    </Svg>
  </Animated.View>
);

const Hearts = ({ isVisible }: { isVisible: boolean }) => {
  const hearts = Array(40)
    .fill(0)
    .map(() => ({
      position: useRef(new Animated.Value(height - 120)).current,
      xOffset: Math.random() * width,
      delay: Math.random() * 2000,
      duration: 3000 + Math.random() * 2000,
    }));

  useEffect(() => {
    if (isVisible) {
      hearts.forEach((heart) => {
        Animated.sequence([
          Animated.delay(heart.delay),
          Animated.timing(heart.position, {
            toValue: -150,
            duration: heart.duration,
            easing: Easing.out(Easing.bezierFn(0.79, 0.4, 0.83, 0.65)),

            useNativeDriver: true,
          }),
        ]).start(() => {
          heart.position.setValue(height);
        });
      });
    }
  }, [hearts, isVisible]);

  if (!isVisible) return null;

  return (
    <View className="absolute w-full h-full">
      {hearts.map((heart, index) => (
        <Heart
          key={index}
          style={{
            position: "absolute",
            left: heart.xOffset,
            transform: [{ translateY: heart.position }],
          }}
        />
      ))}
    </View>
  );
};

export default Hearts;
