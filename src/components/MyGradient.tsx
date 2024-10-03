import { gradient } from "@config/colors";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect } from "react";
import { View, ViewStyle } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const MyGradient = ({
  isHover,
  children,
}: {
  isHover?: boolean;
  children?: React.ReactNode;
}) => {
  const animatedWidth = useSharedValue(0);

  useEffect(() => {
    animatedWidth.value = withTiming(isHover ? 100 : 0, { duration: 600 });
  }, [isHover, animatedWidth]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      position: "absolute",
      top: 0,
      left: 0,
      bottom: 0,
      height: "100%",
      width: `${animatedWidth.value}%`,
      backgroundColor: gradient.primary[0],
    } as ViewStyle;
  });

  return (
    <View className="w-full h-full left-0 top-0 absolute">
      <LinearGradient
        colors={gradient.primary}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
      />
      <Animated.View style={animatedStyle} />
      {children && children}
    </View>
  );
};

export default MyGradient;
