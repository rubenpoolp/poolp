import colors from "@config/colors";
import { MagnifyingGlass } from "phosphor-react-native";
import { ComponentProps } from "react";
import { useTranslation } from "react-i18next";
import { TextInput, View } from "react-native";
import MyTextInput from "./MyTextInput";

interface MySearchInputProps extends ComponentProps<typeof TextInput> {
  className?: string;
}

const MySearchInput = ({ ...props }: MySearchInputProps) => {
  const { t } = useTranslation();

  return (
    <View className="bg-light rounded-2xl py-3 px-4 flex-row space-x-2">
      <MagnifyingGlass color={colors.gray[400]} />
      <MyTextInput
        placeholder={t("onboarding.inputs.search")}
        className="font-semibold self-start w-1/2 text-base"
        placeholderTextColor={colors.gray[400]}
        {...props}
      />
    </View>
  );
};

export default MySearchInput;
