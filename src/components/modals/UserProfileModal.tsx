import { UserProfilePics } from "@/types/story";
import React, { useEffect, useRef, useState } from "react";
import { Image, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import MyModal from "./MyModal";
import OverlayUserProfile from "./OverlayUserProfile";

interface UserProfileModalProps {
  isVisible: boolean;
  onClose: () => void;
  userProfilePics: UserProfilePics;
}

const storyDuration = 5000;

const UserProfileModal = ({
  isVisible,
  onClose,
  userProfilePics,
}: UserProfileModalProps) => {
  const [actualIndex, setActualIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  if (!userProfilePics.urls || userProfilePics.urls.length === 0) return null;

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      if (
        !userProfilePics.urls ||
        actualIndex >= userProfilePics.urls.length - 1
      ) {
        return;
      }
      setActualIndex(actualIndex + 1);
    }, storyDuration);
  }, [actualIndex, userProfilePics]);

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
    if (!userProfilePics.urls || actualIndex >= userProfilePics.urls.length - 1)
      return;
    setActualIndex(actualIndex + 1);
    // timerRef.current?.refresh();
  };

  return (
    <MyModal isVisible={isVisible}>
      <View className="flex-1 bg-overlay w-full h-full">
        {/* need this for the SafeAreaView */}
        <SafeAreaProvider>
          <Image
            source={{ uri: userProfilePics.urls[actualIndex] }}
            className="flex-1 w-full bg-gray-600"
            resizeMode="cover"
          />
          <OverlayUserProfile
            onClose={onClose}
            duration={storyDuration}
            actualIndex={actualIndex}
            userProfilePics={userProfilePics}
            onLeft={onLeft}
            onRight={onRight}
          />
        </SafeAreaProvider>
      </View>
    </MyModal>
  );
};

export default UserProfileModal;
