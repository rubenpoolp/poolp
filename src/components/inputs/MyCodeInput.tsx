import MyTextInput from "@components/inputs/MyTextInput";
import colors from "@config/colors";
import React, { ComponentProps, forwardRef } from "react";
import { TextInput } from "react-native";

interface MyCodeInputProps extends ComponentProps<typeof MyTextInput> {}

const MyCodeInput = forwardRef<TextInput, MyCodeInputProps>((props, ref) => {
  return (
    <MyTextInput
      ref={ref}
      autoFocus
      inputMode="numeric"
      autoComplete="sms-otp"
      className="text-3xl font-semibold text-center text-light"
      placeholder="_ _ _ _ _ _"
      placeholderTextColor={colors.gray[600]}
      {...props}
    />
  );
});

MyCodeInput.displayName = "MyCodeInput";

export default MyCodeInput;
