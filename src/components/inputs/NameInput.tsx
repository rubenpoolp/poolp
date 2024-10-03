import React, { ComponentProps } from "react";
import { TextInput } from "react-native";
import colors from "@config/colors";
import { useTranslation } from "react-i18next";

interface NameInputProps extends ComponentProps<typeof TextInput> {}

const NameInput: React.FC<NameInputProps> = ({ ...props }) => {
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
