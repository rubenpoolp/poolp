import { ComponentProps } from "react";
import { StyleProp, TextInput, ViewStyle } from "react-native";

interface MyTextInputProps extends ComponentProps<typeof TextInput> {
  className?: string;
  style?: StyleProp<ViewStyle>;
}

const MyTextInput = ({ ...props }: MyTextInputProps) => {
  return (
    <TextInput
      autoCapitalize="none"
      {...props}
      style={[
        {
          textAlignVertical: "top",
        },
        props.style,
      ]}
    />
  );
};

export default MyTextInput;
