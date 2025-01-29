import MyPressable from "@components/natives/MyPressable";
import { useEffect, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  View,
} from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

const SnapText = ({
  text,
  onChangeText,
  remove,
}: {
  text: string;
  onChangeText: (text: string) => void;
  remove: () => void;
}) => {
  const translateY = useSharedValue(0);

  const drag = Gesture.Pan().onChange((event) => {
    translateY.value += event.changeY;
  });

  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: translateY.value,
        },
      ],
    };
  });

  return (
    <GestureDetector gesture={drag}>
      <Animated.View
        style={containerStyle}
        className={"w-full bg-background-dark/80 pt-0.5 pb-1.5"}
      >
        <TextInput
          maxLength={32}
          autoFocus
          onBlur={() => {
            if (text === "") remove();
          }}
          className="text-base text-light w-full text-center"
          value={text}
          onChangeText={onChangeText}
        />
      </Animated.View>
    </GestureDetector>
  );
};

const SnapTexts = () => {
  const [textStories, setTextStories] = useState<string[]>([]);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => setIsKeyboardVisible(true),
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => setIsKeyboardVisible(false),
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const newTextStory = () => {
    setTextStories([...textStories, ""]);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="w-full h-full flex-1 absolute"
    >
      <MyPressable
        opacity={1}
        className="w-full h-full space-y-4 justify-end z-50"
        onPress={() => {
          if (isKeyboardVisible) {
            Keyboard.dismiss();
            return;
          }
          newTextStory();
        }}
      >
        <View className="bottom-80">
          {textStories.map((textStory, index) => (
            <SnapText
              key={index}
              text={textStory}
              remove={() => {
                const newTextStories = [...textStories];
                newTextStories.splice(index, 1);
                setTextStories(newTextStories);
              }}
              onChangeText={(text) => {
                const newTextStories = [...textStories];
                newTextStories[index] = text;
                setTextStories(newTextStories);
              }}
            />
          ))}
        </View>
      </MyPressable>
    </KeyboardAvoidingView>
  );
};

export default SnapTexts;
