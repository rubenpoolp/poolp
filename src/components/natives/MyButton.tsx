import MyText from "@src/components/natives/MyText";
import React from "react";
import { ActivityIndicator, View } from "react-native";
import MyGradient from "../MyGradient";
import MyPressable from "./MyPressable";

interface MyButtonProps {
  onPress?: () => void;
  txt?: string;
  txtStyle?: string;
  secondary?: boolean;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
  type?: "default" | "secondary" | "gradient";
  style?: object;
  className?: string;
}

const MyButton = ({
  onPress,
  txt = "",
  txtStyle,
  type = "default",
  disabled = false,
  leftIcon,
  rightIcon,
  isLoading = false,
  style,
}: MyButtonProps): React.ReactElement => {
  const template: Record<
    string,
    {
      container: string;
      text: string;
      shadow?: boolean;
    }
  > = {
    default: {
      container: "",
      text: "text-white",
    },
    secondary: {
      container: "",
      text: "text-blue-300",
    },
    gradient: {
      container: "",
      text: "text-white",
    },
  };

  return (
    <MyPressable
      className={`flex-row py-3.5 items-center justify-center px-5 rounded-2xl self-start
      ${template[type].container}  ${
        rightIcon && !isLoading && "justify-between"
      } ${disabled && "opacity-50"}`}
      style={style}
      onPress={onPress}
      disabled={disabled || isLoading}
    >
      {type === "gradient" && <MyGradient />}
      {leftIcon && !isLoading && leftIcon}
      {txt && !isLoading && (
        <MyText
          className={`text-lg font-semibold ${template[type].text} ${txtStyle}`}
        >
          {txt}
        </MyText>
      )}
      {isLoading && (
        <View>
          <ActivityIndicator
            size={"small"}
            color={type === "secondary" ? "white" : "black"}
          />
        </View>
      )}
      {rightIcon && !isLoading && rightIcon}
    </MyPressable>
  );
};

export default MyButton;
