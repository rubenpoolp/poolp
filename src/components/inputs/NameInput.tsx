import colors from "@config/colors";
import React, { ComponentProps, forwardRef } from "react";
import { useTranslation } from "react-i18next";
import { TextInput } from "react-native";
import MyTextInput from "./MyTextInput";

interface NameInputProps extends ComponentProps<typeof TextInput> {}

const NameInput = forwardRef<TextInput, NameInputProps>((props, ref) => {
  const { t } = useTranslation();

  return (
    <MyTextInput
      ref={ref}
      placeholder={t("onboarding.inputs.name.placeholder")}
      className="text-3xl font-semibold text-center text-light"
      placeholderTextColor={colors.gray[600]}
      style={{
        textAlignVertical: "top",
      }}
      {...props}
    />
  );
});

NameInput.displayName = "NameInput";

export default NameInput;
