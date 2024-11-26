import BellRinging from "@components/SVGs/BellRinging";
import { hapticImpact } from "@utils/haptics";
import React from "react";
import { Animated, TouchableOpacity, View } from "react-native";

interface BellButtonProps {
  onPress: () => void;
  disabled?: boolean;
}

const BellButton = ({
  onPress,
  disabled = false,
}: BellButtonProps) => {

  const animation = new Animated.Value(0);
  const inputRange = [0, 1];
  const outputRange = [1, 2];
  const scale = animation.interpolate({inputRange, outputRange});

  const onPressIn = () => {
    Animated.spring(animation, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };
  const onPressOut = () => {
    Animated.spring(animation, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
    hapticImpact("medium");
  };
  return (
    <View>
      <Animated.View className="rounded-full w-16 aspect-square items-center justify-center bg-tabBar-background" style={[{transform: [{scale}]}]}>
        <TouchableOpacity
          className="flex justify-center items-center"
          activeOpacity={1}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
          onPress={onPress}
          disabled={disabled}>
          <BellRinging width={32} height={32}/>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default BellButton;
