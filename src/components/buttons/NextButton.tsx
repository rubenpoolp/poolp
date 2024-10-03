import shadow from "@config/shadow";
import { ArrowRight } from "phosphor-react-native";
import React, { useState } from "react";
import { View } from "react-native";
import { Bump } from "../animations/Bump";
import MyGradient from "../MyGradient";
import MyPressable from "../natives/MyPressable";

interface NextButtonProps {
  onPress: () => void;
  disabled?: boolean;
}

const NextButton: React.FC<NextButtonProps> = ({
  onPress,
  disabled = false,
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };

  const myOnPress = () => {
    onPress();
  };

  return (
    <View className="items-center">
      <Bump>
        <MyPressable
          hapticImpactStyle="medium"
          onPress={myOnPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          disabled={disabled}
          className="rounded-full w-14 aspect-square items-center justify-center bg-light"
          style={shadow.purple}
        >
          <MyGradient isPressed={isPressed} className="rounded-full" />
          <ArrowRight />
        </MyPressable>
      </Bump>
    </View>
  );
};

export default NextButton;
