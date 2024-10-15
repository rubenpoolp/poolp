import StoryModal from "@components/modals/StoryModal";
import MyPressable from "@components/natives/MyPressable";
import React, { useState } from "react";
import { ImageProps, StyleProp, ViewStyle } from "react-native";

type StoryButtonProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  className?: string;
  stories: {
    firstName: string;
    img: ImageProps["source"];
  }[];
};

const StoryButton = ({ children, style, stories }: StoryButtonProps) => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <>
      <MyPressable onPress={() => setIsVisible(true)} style={style}>
        {children}
      </MyPressable>
      <StoryModal
        isVisible={isVisible}
        onClose={() => setIsVisible(false)}
        stories={stories}
      />
    </>
  );
};

export default StoryButton;
