import React, { ComponentProps } from "react";
import { TextInput, View } from "react-native";
import MyTextInput from "./MyTextInput";
import colors from "@config/colors";

interface NameInputProps extends ComponentProps<typeof TextInput> {}

const NameInput: React.FC<NameInputProps> = ({ ...props }) => {
  return (
    <TextInput
      placeholder="Your name"
      className="text-3xl font-semibold text-center"
      placeholderTextColor={colors.gray[600]}
      style={{
        textAlignVertical: "top",
      }}
      {...props}
    />
  );
};

export default NameInput;
