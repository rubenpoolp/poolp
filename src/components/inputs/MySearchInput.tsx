import { ComponentProps } from "react";
import MyTextInput from "./MyTextInput";
import { TextInput, View } from "react-native";
import { MagnifyingGlass } from "phosphor-react-native";
import colors from "@config/colors";

interface MySearchInputProps extends ComponentProps<typeof TextInput> {
  className?: string;
}

const MySearchInput = ({ ...props }: MySearchInputProps) => {
  return (
    <View className="bg-light rounded-2xl py-3 px-4 flex-row space-x-2">
      <MagnifyingGlass color={colors.gray[400]} />
      <MyTextInput
        placeholder="Search"
        className="font-semibold"
        placeholderTextColor={colors.gray[400]}
        {...props}
      />
    </View>
  );
};

export default MySearchInput;
