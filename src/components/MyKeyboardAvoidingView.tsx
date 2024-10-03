import React, { ComponentProps, ReactNode } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  View,
} from "react-native";

interface MyKeyboardAvoidingViewProps
  extends ComponentProps<typeof KeyboardAvoidingView> {
  children: ReactNode;
}

const MyKeyboardAvoidingView = (props: MyKeyboardAvoidingViewProps) => {
  const { children } = props;
  const keyboardVerticalOffset = Platform.OS === "ios" ? 140 : 0;

  return (
    <View className={`flex-1 w-full`}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={keyboardVerticalOffset}
        className="flex-1"
        {...props}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className={`flex-1`} style={props.style}>
            {children}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};

export default MyKeyboardAvoidingView;
