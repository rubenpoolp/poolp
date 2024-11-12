import TailVideoShutter from "@components/SVGs/TailVideoShutter";
import React, { useEffect, useState } from "react";
import { Pressable, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

const HOLD_TIME_FOR_VIDEO = 500;

export const AnimatedPlayPauseButton = ({
  onPress,
  onEndHold,
}: {
  onPress: () => void;
  onEndHold: () => void;
}) => {
  const [timeHolded, setTimeHolded] = useState(0);
  const [isPressed, setIsPressed] = useState(false);
  const isHolding = useSharedValue(false);
  const rotation = useSharedValue(0);

  useEffect(() => {
    let holdTimer: NodeJS.Timeout;

    if (isPressed && timeHolded !== 0) {
      holdTimer = setTimeout(() => {
        isHolding.value = true;
        rotation.value = withRepeat(
          withSequence(
            withTiming(360, {
              duration: 2000,
              easing: Easing.linear,
            }),
          ),
          -1,
        );
      }, HOLD_TIME_FOR_VIDEO);
    }

    return () => {
      if (holdTimer) {
        clearTimeout(holdTimer);
      }
    };
  }, [isPressed, timeHolded]);

  const circleAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotateZ: `${rotation.value}deg` }],
      opacity: isHolding.value ? 1 : 0,
    };
  });

  const stopHoldAnimation = () => {
    isHolding.value = false;
    rotation.value = withTiming(0);
  };

  return (
    <Pressable
      className="items-center justify-center h-20"
      onPressIn={() => {
        setIsPressed(true);
        setTimeHolded(new Date().getTime());
      }}
      onPressOut={() => {
        setIsPressed(false);
        stopHoldAnimation();
      }}
      onTouchEnd={() => {
        const currentTime = new Date().getTime();
        if (timeHolded < currentTime - HOLD_TIME_FOR_VIDEO) {
          onEndHold();
        } else {
          onPress();
        }
        setTimeHolded(0);
      }}
    >
      <View
        className={`w-20 h-20 border-[6px] border-gray-200 rounded-full absolute`}
      />
      <Animated.View
        className="w-20 h-20 rounded-full absolute bg-[#B595E9]"
        style={circleAnimatedStyle}
      >
        <TailVideoShutter />
        <View className="w-2 h-2 bg-[#7826FD] rounded-full absolute left-1/2 transform -translate-x-1.5" />
      </Animated.View>
    </Pressable>
  );
};

interface ShutterButtonProps {
  onPressPicture: () => void;
  onHoldVideo: () => void;
}

const ShutterButton: React.FC<ShutterButtonProps> = ({
  onPressPicture,
  onHoldVideo,
}) => {
  return (
    <AnimatedPlayPauseButton onPress={onPressPicture} onEndHold={onHoldVideo} />
  );
};

export default ShutterButton;
