import shadow from "@config/shadow";
import { ArrowRight } from "phosphor-react-native";
import React from "react";
import { View } from "react-native";
import { Bump } from "../animations/Bump";
import MyGradient from "../MyGradient";
import MyPressable from "../natives/MyPressable";

interface NextButtonProps {
  onPress: () => void;
  disabled?: boolean;
}

const NextButton = ({ onPress, disabled = false }: NextButtonProps) => {
  return (
    <View className="items-center">
      <Bump>
        <MyPressable
          hapticImpactStyle="medium"
          onPress={onPress}
          disabled={disabled}
          className="rounded-full w-16 aspect-square items-center justify-center bg-light"
          style={shadow.purple}
        >
          <MyGradient className="rounded-full" />
          <ArrowRight size={28} />
        </MyPressable>
      </Bump>
    </View>
  );
};

export default NextButton;
