import { ComponentProps } from "react";
import { View } from "react-native";
import MyTextInput from "./MyTextInput";

interface MyTextAreaInputProps extends ComponentProps<typeof MyTextInput> {

}

const MyTextAreaInput = ({ ...props }: MyTextAreaInputProps) => {
  return (
    <View className="bg-light rounded-2xl px-3 pt-1 pb-3">
      <MyTextInput multiline={true} numberOfLines={10} style={{ minHeight: 150 }} {...props}/>
    </View>
  )
};

export default MyTextAreaInput;
