import { gray, light } from "@config/colors";
import { CaretDown } from "phosphor-react-native";
import React from "react";
import MyPressable from "../natives/MyPressable";

interface CloseModalButtonProps {
  padding?: boolean;
  theme?: "dark" | "white";
  onPress: () => void;
}

const CloseModalButton = ({
  padding = true,
  theme = "dark",
  onPress,
}: CloseModalButtonProps) => {
  return (
    <MyPressable onPress={onPress} className={`${padding && "p-2"}`}>
      <CaretDown color={theme !== "dark" ? gray[600] : light} />
    </MyPressable>
  );
};

export default CloseModalButton;
