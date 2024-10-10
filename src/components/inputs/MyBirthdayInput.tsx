import colors from "@config/colors";
import React, { ComponentProps, useCallback, useState } from "react";
import { TextInput } from "react-native";
import MyTextInput from "./MyTextInput";
import { useTranslation } from "react-i18next";

interface MyBirthdayInputProps extends ComponentProps<typeof TextInput> {}

const MyBirthdayInput = ({ onChangeText, ...props }: MyBirthdayInputProps) => {
  const [value, setValue] = useState("");
  const { t } = useTranslation();

  const formatDate = useCallback((input: string) => {
    const numbers = input.replace(/\D/g, "").slice(0, 8);
    const parts = [
      numbers.slice(0, 2),
      numbers.slice(2, 4),
      numbers.slice(4),
    ].filter((part) => part !== "");

    return parts.join("/");
  }, []);

  const handleChange = useCallback(
    (text: string) => {
      const formatted = formatDate(text);
      setValue(formatted);
      if (onChangeText) {
        onChangeText(formatted);
      }
    },
    [formatDate, onChangeText],
  );

  return (
    <MyTextInput
      placeholder={t("onboarding.inputs.birthday.placeholder")}
      className="text-3xl font-semibold text-center text-light"
      placeholderTextColor={colors.gray[600]}
      keyboardType="numeric"
      value={value}
      onChangeText={handleChange}
      {...props}
    />
  );
};

export default MyBirthdayInput;
