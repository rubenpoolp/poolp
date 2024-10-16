import { gray, light } from "@config/colors";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeft } from "phosphor-react-native";
import React from "react";
import MyPressable from "../natives/MyPressable";

interface BackButtonProps {
  padding?: boolean;
  theme?: "dark" | "white";
}

const BackButton = ({ padding = true, theme = "dark" }: BackButtonProps) => {
  const navigation = useNavigation();

  const onPress = () => {
    if (navigation.canGoBack()) navigation.goBack();
    else navigation.navigate("Introduction");
  };

  return (
    <MyPressable onPress={onPress} className={`${padding && "p-2"}`}>
      <ArrowLeft color={theme !== "dark" ? gray[600] : light} />
    </MyPressable>
  );
};

export default BackButton;
