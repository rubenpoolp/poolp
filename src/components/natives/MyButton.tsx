import MyText from "@components/natives/MyText";
import shadow from "@config/shadow";
import React, { ComponentProps } from "react";
import { Pressable, StyleProp, View, ViewStyle } from "react-native";
import { SvgProps } from "react-native-svg";
import MyGradient from "../MyGradient";
import MyPressable from "./MyPressable";

interface MyButtonProps extends ComponentProps<typeof Pressable> {
  variant?: "gradient" | "pink";
  size?: "small" | "medium" | "large";
  txtClassName?: string;
  LeftComponent?: (props: SvgProps) => JSX.Element;
  RightComponent?: (props: SvgProps) => JSX.Element;
  txt?: string;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

const variantStyle = {
  gradient: { container: "", text: "text-white" },
  pink: { container: "bg-pink-100", text: "text-[#391952]" },
};

const sizeStyle = {
  small: { container: "py-2 px-4", text: "text-sm" },
  medium: { container: "py-3 px-10", text: "text-lg" },
  large: { container: "py-4 px-6", text: "text-xl" },
};

const MyButton = ({
  variant = "gradient",
  size = "medium",
  txtClassName,
  LeftComponent,
  RightComponent,
  txt,
  onPress,
  ...props
}: MyButtonProps): React.ReactElement => {
  return (
    <MyPressable
      className={`rounded-full items-center justify-center bg-light w-full ${(LeftComponent || RightComponent) && "flex-row w-full justify-between"} ${
        variantStyle[variant].container
      } ${sizeStyle[size].container}`}
      {...props}
      hapticImpactStyle="medium"
      onPress={onPress}
      style={[
        props.style,
        { elevation: 10 },
        variant === "gradient" && shadow.purple,
      ]}
    >
      {variant === "gradient" && <MyGradient className="rounded-full" />}
      {RightComponent && !LeftComponent && (
        <View className="opacity-0">
          <RightComponent />
        </View>
      )}
      {LeftComponent && <LeftComponent />}
      <MyText
        className={`text-center font-medium ${variantStyle[variant].text} ${sizeStyle[size].text} ${txtClassName}`}
      >
        {txt}
      </MyText>
      {LeftComponent && !RightComponent && (
        <View className="opacity-0">
          <LeftComponent />
        </View>
      )}
      {RightComponent && <RightComponent />}
    </MyPressable>
  );
};

export default MyButton;
