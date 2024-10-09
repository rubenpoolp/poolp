import colors from "@config/colors";
import React, { ComponentProps } from "react";
import { useTranslation } from "react-i18next";
import { TextInput } from "react-native";

interface NameInputProps extends ComponentProps<typeof TextInput> {}

const NameInput = ({ ...props }: NameInputProps) => {
  const { t } = useTranslation();

  return (
    <TextInput
      placeholder={t("inputs.name.placeholder")}
      className="text-3xl font-semibold text-center text-light"
      placeholderTextColor={colors.gray[600]}
      style={{
        textAlignVertical: "top",
      }}
      {...props}
    />
  );
};

export default NameInput;
