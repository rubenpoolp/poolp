import React, { ComponentProps, useState, useCallback } from "react";
import { TextInput } from "react-native";
import colors from "@config/colors";
import { useTranslation } from "react-i18next"; // Ajoutez cette importation
import MyTextInput from "./MyTextInput";

interface MyBirthdayInputProps extends ComponentProps<typeof TextInput> {}

const MyBirthdayInput: React.FC<MyBirthdayInputProps> = ({
  onChangeText,
  ...props
}) => {
  const [value, setValue] = useState("");
  const { t } = useTranslation(); // Ajoutez cette ligne

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
      placeholder={t("inputs.birthday.placeholder")}
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
