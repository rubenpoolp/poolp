import { ArrowRight } from "phosphor-react-native";
import React from "react";
import { View } from "react-native";
import { Bump } from "../animations/Bump";
import MyGradient from "../MyGradient";
import MyPressable from "../natives/MyPressable";
import shadow from "@config/shadow";

interface NextButtonProps {
  onPress: () => void;
  disabled?: boolean;
}

const NextButton: React.FC<NextButtonProps> = ({
  onPress,
  disabled = false,
}) => {
  return (
    <View className="items-center">
      <Bump>
        <MyPressable
          hapticImpactStyle="medium"
          onPress={onPress}
          disabled={disabled}
          className="rounded-full w-14 aspect-square items-center justify-center bg-light"
          style={shadow.purple}
        >
          <MyGradient className="rounded-full" />
          <ArrowRight />
        </MyPressable>
      </Bump>
    </View>
  );
};

export default NextButton;
