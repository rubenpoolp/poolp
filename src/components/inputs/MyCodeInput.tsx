import React from "react";
import { ComponentProps } from "react";
import MyTextInput from "@src/components/inputs/MyTextInput";
import colors from "@config/colors";

interface MyCodeInputProps extends ComponentProps<typeof MyTextInput> {}

const MyCodeInput: React.FC<MyCodeInputProps> = ({ ...props }) => {
  return (
    <MyTextInput
      autoFocus
      inputMode="numeric"
      autoComplete="sms-otp"
      className="text-3xl font-semibold text-center text-light"
      placeholder="_ _ _ _ _ _"
      placeholderTextColor={colors.gray[600]}
      {...props}
    />
  );
};

export default MyCodeInput;
