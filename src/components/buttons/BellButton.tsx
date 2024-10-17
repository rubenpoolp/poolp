import { Bump } from "@components/animations/Bump";
import MyPressable from "@components/natives/MyPressable";
import { BellRinging } from "phosphor-react-native";
import React from "react";
import { View } from "react-native";

interface BellButtonProps {
  onPress: () => void;
  disabled?: boolean;
  containerStyle?: string;
}

const BellButton = ({
  onPress,
  disabled = false,
  containerStyle = "",
}: BellButtonProps) => {
  return (
    <View className={`items-center ${containerStyle}`}>
      <Bump>
        <MyPressable
          hapticImpactStyle="medium"
          onPress={onPress}
          disabled={disabled}
          className="rounded-full w-12 aspect-square items-center justify-center bg-tabBar-background"
        >
          {/* <MyGradient className="rounded-full" /> */}
          <BellRinging size={24} />
        </MyPressable>
      </Bump>
    </View>
  );
};

export default BellButton;
