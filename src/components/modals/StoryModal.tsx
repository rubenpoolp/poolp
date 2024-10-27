import { UserStories } from "@/types/story";
import OverlayStoryModal, {
  VariantOverlayStoryModal,
} from "@components/OverlayStory";
import React, { useEffect, useRef, useState } from "react";
import { Image, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import MyModal from "./MyModal";

interface StoryModalProps {
  variant?: VariantOverlayStoryModal;
  isVisible: boolean;
  onClose: () => void;
  stories: UserStories[];
}

const storyDuration = 5000;

const StoryModal = ({
  variant,
  isVisible,
  onClose,
  stories,
}: StoryModalProps) => {
  const [actualIndex, setActualIndex] = useState(0);
  const flattenStories = stories.flat();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      if (actualIndex >= flattenStories.length - 1) {
        return;
      }
      setActualIndex(actualIndex + 1);
    }, storyDuration);
  }, [actualIndex, flattenStories.length]);

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
    if (actualIndex >= flattenStories.length - 1) return;
    setActualIndex(actualIndex + 1);
    // timerRef.current?.refresh();
  };

  if (flattenStories.length === 0) return null;

  return (
    <MyModal isVisible={isVisible}>
      <View className="flex-1 bg-overlay w-full h-full">
        {/* need this for the SafeAreaView */}
        <SafeAreaProvider>
          <Image
            source={flattenStories[actualIndex].picture}
            className="flex-1 w-full"
            resizeMode="cover"
          />
          <OverlayStoryModal
            variant={variant}
            onClose={onClose}
            duration={storyDuration}
            actualIndex={actualIndex}
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
