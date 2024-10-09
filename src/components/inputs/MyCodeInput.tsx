import MyTextInput from "@components/inputs/MyTextInput";
import colors from "@config/colors";
import React, { ComponentProps } from "react";

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
