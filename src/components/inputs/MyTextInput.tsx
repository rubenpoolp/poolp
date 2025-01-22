import { ComponentProps, forwardRef } from "react";
import { StyleProp, TextInput, ViewStyle } from "react-native";

interface MyTextInputProps extends ComponentProps<typeof TextInput> {
  className?: string;
  style?: StyleProp<ViewStyle>;
}

const MyTextInput = forwardRef<TextInput, MyTextInputProps>((props, ref) => {
  return (
    <TextInput
      ref={ref}
      autoCapitalize="none"
      {...props}
      style={[
        {
          fontFamily: "SFProDisplaySemibold",
          textAlignVertical: "top",
        },
        props.style,
      ]}
    />
  );
});

MyTextInput.displayName = "MyTextInput";

export default MyTextInput;
