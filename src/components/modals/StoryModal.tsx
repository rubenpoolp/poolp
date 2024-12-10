import { Story } from "@/types/story";
import VideoPlayer from "@pages/takePicture/components/VideoPlayer";
import { getDateLastTimeWentOnCircle, setDateLastTimeWentOnCircle } from "@utils/circles";
import { format } from "date-fns";
import React, { useEffect, useRef, useState } from "react";
import { Image, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import MyModal from "./MyModal";
import OverlayStoryModal from "./OverlayStory";

interface StoryModalProps {
  isVisible: boolean;
  onClose: () => void;
  stories: Story[];
}

const storyDuration = 5000;

const StoryModal = ({ isVisible, onClose, stories }: StoryModalProps) => {
  const [actualIndex, setActualIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const displayNextStory = () => {
    if (!stories || actualIndex >= stories.length - 1) {
      return;
    }
    setActualIndex(actualIndex + 1);
    setDateLastTimeWentOnCircle();
  }

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      if (!stories || actualIndex >= stories.length - 1) {
        return;
      }
      displayNextStory();
    }, storyDuration);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [actualIndex, stories]);

  useEffect(() => {
    const fetchLastViewedDate = async () => {
      if (isVisible) {
        const lastViewedDate = await getDateLastTimeWentOnCircle();
        if (!lastViewedDate) return;

        const index = stories.findIndex((story) => {
          return Number(format(story.created_at, "t")) > Number(lastViewedDate);
        });
        setActualIndex(index >= 0 ? index : stories.length === 0 ? 0 : stories.length - 1);
      }
    };

    fetchLastViewedDate();
  }, [isVisible]);

  const onLeft = () => {
    if (actualIndex <= 0) return;
    setActualIndex(actualIndex - 1);
    // timerRef.current?.refresh();
  };

  const onRight = () => {
    if (!stories || actualIndex >= stories.length - 1) return;
    displayNextStory();
  };

  if (!stories || stories.length === 0) return null;

  return (
    <MyModal isVisible={isVisible}>
      <View className="flex-1 bg-overlay w-full h-full">
        {/* need this for the SafeAreaView */}
        <SafeAreaProvider>
          {stories?.[actualIndex].url.endsWith(".mp4") ? (
            <View className="flex-1 w-full bg-gray-600">
              <VideoPlayer
                video={{ path: stories?.[actualIndex].url, external: true }}
              />
            </View>
          ) : (
            <Image
              source={{ uri: stories?.[actualIndex].url }}
              className="flex-1 w-full bg-gray-600"
              resizeMode="cover"
            />
          )}
          <OverlayStoryModal
            onClose={onClose}
            duration={storyDuration}
            actualIndex={actualIndex}
            onLeft={onLeft}
            onRight={onRight}
            stories={stories}
          />
        </SafeAreaProvider>
      </View>
    </MyModal>
  );
};

export default StoryModal;
