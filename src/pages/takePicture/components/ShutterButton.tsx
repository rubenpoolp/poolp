import React, { useState } from "react";
import { Pressable, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const HOLD_TIME_FOR_VIDEO = 1000;
export const AnimatedPlayPauseButton = ({
  onPress,
  onEndHold,
}: {
  onPress: () => void;
  onEndHold: () => void;
}) => {
  const [animate, setAnimate] = useState(false);
  const pressed = useSharedValue(false);
  const [timeHolded, setTimeHolded] = useState(0);

  const primaryButtonAnimatedStyle = useAnimatedStyle(
    () => ({
      borderRadius: withTiming(animate ? 5 : 30),
      width: withSpring(animate ? 30 : 52),
      height: withSpring(animate ? 30 : 52),
      transform: [
        { scale: withSpring(pressed.value ? 0.8 : 1, { mass: 0.1 }) },
      ],
    }),
    [animate, pressed.value],
  );

  return (
    <Pressable
      className="items-center justify-center h-20"
      onPressIn={() => {
        setTimeHolded(new Date().getTime());
        pressed.value = true;
      }}
      onPressOut={() => {
        const pressOut = setTimeout(() => {
          pressed.value = false;
        }, 500);
        return () => clearTimeout(pressOut);
      }}
      onTouchEnd={() => {
        if (timeHolded < new Date().getTime() - HOLD_TIME_FOR_VIDEO)
          onEndHold();
        else onPress();
        setTimeHolded(0);
      }}
    >
      <View className="w-20 h-20 border-[6px] border-gray-200 rounded-full absolute" />
      <Animated.View
        className={`items-center justify-center ${pressed.value === true ? "bg-gray-200" : ""}`}
        style={primaryButtonAnimatedStyle}
      />
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
