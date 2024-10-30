import React, { useState } from "react";
import { Pressable, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

export const AnimatedPlayPauseButton = ({
  animate,
  onPress,
}: {
  animate: boolean;
  onPress: () => void;
}) => {
  const pressed = useSharedValue(false);

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
      onPress={onPress}
      onPressIn={() => (pressed.value = true)}
      onPressOut={() => {
        const pressOut = setTimeout(() => {
          pressed.value = false;
        }, 500);
        return () => clearTimeout(pressOut);
      }}
    >
      <View className="w-16 h-16 border-2 border-gray-200 rounded-full absolute" />
      <Animated.View
        className="bg-gray-200 items-center justify-center"
        style={primaryButtonAnimatedStyle}
      />
    </Pressable>
  );
};

interface ShutterButtonProps {
  onPress: () => void;
}

const ShutterButton: React.FC<ShutterButtonProps> = ({ onPress }) => {
  const [animate, setAnimate] = useState(false);

  return (
    <AnimatedPlayPauseButton
      animate={animate}
      onPress={() => {
        setAnimate(true);
        onPress();
        setTimeout(() => setAnimate(false), 50);
      }}
    />
  );
};

export default ShutterButton;
