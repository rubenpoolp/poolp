import { UserProfilePics, UserStories } from "@/types/story";
import StoryModal from "@components/modals/StoryModal";
import MyPressable from "@components/natives/MyPressable";
import React, { useState } from "react";
import { StyleProp, ViewStyle } from "react-native";

type StoryButtonProps = {
  children: React.ReactNode;
  className?: string;
  stories?: UserStories[];
  userProfilePics?: UserProfilePics;
  style?: StyleProp<ViewStyle>;
};

const StoryButton = ({
  children,
  style,
  stories,
  userProfilePics,
}: StoryButtonProps) => {
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
        userProfilePics={userProfilePics}
      />
    </>
  );
};

export default StoryButton;
