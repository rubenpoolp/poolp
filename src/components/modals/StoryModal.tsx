import OverlayStoryModal from "@components/OverlayStory";
import React, { useEffect, useState } from "react";
import { Image, ImageProps, View } from "react-native";
import MyModal from "./MyModal";

interface StoryModalProps {
  isVisible: boolean;
  onClose: () => void;
  stories: {
    img: ImageProps["source"];
    firstName: string;
  }[];
}
const storyDuration = 5000;

const StoryModal = ({ isVisible, onClose, stories }: StoryModalProps) => {
  const [actualIndex, setActualIndex] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      if (actualIndex >= stories.length - 1) {
        return;
      }
      setActualIndex(actualIndex + 1);
    }, storyDuration);
  }, [actualIndex, stories.length]);

  useEffect(() => {
    if (isVisible) {
      setActualIndex(0);
    }
  }, [isVisible]);

  const onLeft = () => {
    if (actualIndex <= 0) return;
    setActualIndex(actualIndex - 1);
  };

  const onRight = () => {
    if (actualIndex >= stories.length - 1) return;
    setActualIndex(actualIndex + 1);
  };

  return (
    <MyModal isVisible={isVisible}>
      <View className="flex-1 bg-overlay w-full h-full">
        <Image
          source={stories[actualIndex].img}
          className="flex-1 w-full"
          resizeMode="cover"
        />
        <OverlayStoryModal
          onClose={onClose}
          stories={stories}
          duration={storyDuration}
          actualIndex={actualIndex}
          onLeft={onLeft}
          onRight={onRight}
          firstName={stories[actualIndex].firstName}
        />
      </View>
    </MyModal>
  );
};

export default StoryModal;
