import { UserStories } from "@/types/story";
import StoryModal from "@components/modals/StoryModal";
import MyPressable from "@components/natives/MyPressable";
import React, { useState } from "react";
import { StyleProp, ViewStyle } from "react-native";

type StoryButtonProps = {
  children: React.ReactNode;
  className?: string;
  stories: UserStories[];
  style?: StyleProp<ViewStyle>;
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
