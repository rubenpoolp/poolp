import { UserStories } from "@/types/story";
import StoryModal from "@components/modals/StoryModal";
import MyPressable from "@components/natives/MyPressable";
import { VariantOverlayStoryModal } from "@components/OverlayStory";
import React, { useState } from "react";
import { StyleProp, ViewStyle } from "react-native";

type StoryButtonProps = {
  children: React.ReactNode;
  variant?: VariantOverlayStoryModal;
  style?: StyleProp<ViewStyle>;
  className?: string;
  stories: UserStories[];
};

const StoryButton = ({
  children,
  variant,
  style,
  stories,
}: StoryButtonProps) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      <MyPressable onPress={() => setIsVisible(true)} style={style}>
        {children}
      </MyPressable>
      <StoryModal
        variant={variant}
        isVisible={isVisible}
        onClose={() => setIsVisible(false)}
        stories={stories}
      />
    </>
  );
};

export default StoryButton;
