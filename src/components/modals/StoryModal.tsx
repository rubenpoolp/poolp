import { UserProfilePics, UserStories } from "@/types/story";
import OverlayStoryModal from "@components/OverlayStory";
import React, { useEffect, useRef, useState } from "react";
import { Image, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import MyModal from "./MyModal";

interface StoryModalProps {
  isVisible: boolean;
  onClose: () => void;
  stories?: UserStories[];
  userProfilePics?: UserProfilePics;
}

const storyDuration = 5000;

const StoryModal = ({
  isVisible,
  onClose,
  stories,
  userProfilePics,
}: StoryModalProps) => {
  const [actualIndex, setActualIndex] = useState(0);
  const flattenStories = stories?.flat();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [picture, setPicture] = useState<string | null>(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      if (!flattenStories || actualIndex >= flattenStories.length - 1) {
        return;
      }
      setActualIndex(actualIndex + 1);
    }, storyDuration);
  }, [actualIndex, flattenStories]);

  useEffect(() => {
    if (isVisible) {
      setActualIndex(0);
    }
  }, [isVisible]);

  const onLeft = () => {
    if (actualIndex <= 0) return;
    setActualIndex(actualIndex - 1);
    // timerRef.current?.refresh();
  };

  const onRight = () => {
    if (!flattenStories || actualIndex >= flattenStories.length - 1) return;
    setActualIndex(actualIndex + 1);
    // timerRef.current?.refresh();
  };

  useEffect(() => {
    if (userProfilePics?.urls?.[actualIndex]) {
      setPicture(userProfilePics.urls?.[actualIndex]);
    }
  }, [actualIndex, userProfilePics]);

  return (
    <MyModal isVisible={isVisible}>
      <View className="flex-1 bg-overlay w-full h-full">
        {/* need this for the SafeAreaView */}
        <SafeAreaProvider>
          <Image
            source={
              picture ? { uri: picture } : flattenStories?.[actualIndex].picture
            }
            className="flex-1 w-full bg-gray-600"
            resizeMode="cover"
          />
          <OverlayStoryModal
            onClose={onClose}
            duration={storyDuration}
            actualIndex={actualIndex}
            userProfilePics={userProfilePics}
            onLeft={onLeft}
            onRight={onRight}
            stories={flattenStories}
          />
        </SafeAreaProvider>
      </View>
    </MyModal>
  );
};

export default StoryModal;
