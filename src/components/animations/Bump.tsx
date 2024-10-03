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
}

const defaultConfig: WithSpringConfig = {
  damping: 10,
  stiffness: 200,
};

export const Bump: React.FC<BumpProps> = ({
  children,
  scaleValue = 0.8,
  springConfig = defaultConfig,
}) => {
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

  return (
    <Animated.View style={animatedStyle}>
      {React.cloneElement(children as React.ReactElement, {
        onPressIn: handlePressIn,
        onPressOut: handlePressOut,
      })}
    </Animated.View>
  );
};
