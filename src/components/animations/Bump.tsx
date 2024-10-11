import React, { ReactNode } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  WithSpringConfig,
} from "react-native-reanimated";

interface BumpProps {
  children: ReactNode;
  scaleValue?: number;
  springConfig?: WithSpringConfig;
  disabled?: boolean;
}

const defaultConfig: WithSpringConfig = {
  damping: 10,
  stiffness: 200,
};

export const Bump = ({
  children,
  disabled = false,
  scaleValue = 0.8,
  springConfig = defaultConfig,
}: BumpProps) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(scaleValue, springConfig);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, springConfig);
  };

  if (disabled) {
    return <>{children}</>;
  }

  return (
    <Animated.View style={animatedStyle}>
      {React.cloneElement(children as React.ReactElement, {
        onPressIn: handlePressIn,
        onPressOut: handlePressOut,
      })}
    </Animated.View>
  );
};
