import { UserProfilePics } from "@/types/story";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { LinearGradient } from "expo-linear-gradient";
import { CaretUp, DotsThree, X } from "phosphor-react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import { Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import StoryBarLoader from "../animations/StoriesBarLoader";
import MyPressable from "../natives/MyPressable";
import MyText from "../natives/MyText";

interface OverlayUserProfileProps {
  onClose: () => void;
  userProfilePics?: UserProfilePics;
  actualIndex: number;
  duration: number;
  onLeft: () => void;
  onRight: () => void;
}

const OverlayUserProfile = ({
  onClose,
  actualIndex,
  duration,
  onLeft,
  onRight,
  userProfilePics,
}: OverlayUserProfileProps) => {
  const { t } = useTranslation();
  const { showActionSheetWithOptions } = useActionSheet();

  const onPressDotsThree = () => {
    const options = [
      t("actions.block"),
      t("actions.report"),
      t("actions.ring"),
      t("actions.cancel"),
    ];
    const cancelButtonIndex = 3;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      (selectedIndex?: number) => {
        switch (selectedIndex) {
          case 0:
            break;
          case 1:
            break;
          case 2:
            break;
          case cancelButtonIndex:
            break;
        }
      },
    );
  };

  if (!userProfilePics || !userProfilePics.urls) return null;

  return (
    <>
      <SafeAreaView
        edges={userProfilePics ? ["top", "bottom"] : ["top"]}
        className="absolute w-full h-full z-10"
      >
        <View className="absolute w-full flex-1 h-4/5 bottom-28 justify-end flex-rowz-20">
          <Pressable className="flex-1" onPress={onLeft} />
          <Pressable className="flex-1" onPress={onRight} />
        </View>
        <View className="flex-1 px-4 justify-between">
          <View className="space-y-4">
            <StoryBarLoader
              index={actualIndex}
              duration={duration}
              total={userProfilePics.urls.length}
            />
            <View className="flex-row justify-between items-center">
              <View />
              <View className="self-end mr-2 flex-row space-x-2">
                <MyPressable onPress={onPressDotsThree}>
                  <DotsThree />
                </MyPressable>
                <MyPressable onPress={onClose}>
                  <X />
                </MyPressable>
              </View>
            </View>
          </View>
        </View>
        {userProfilePics && (
          <View className="px-4">
            <MyText className="text-3xl font-semibold mb-4">
              {userProfilePics.user_name}
            </MyText>

            <MyPressable onPress={onClose}>
              <View className="self-center">
                <CaretUp size={28} />
              </View>
            </MyPressable>
          </View>
        )}
      </SafeAreaView>
      {/* propagate the click to the parent */}
      <LinearGradient
        colors={["rgba(0,0,0,0.4)", "transparent"]}
        className="absolute top-0 w-full h-1/2"
      />
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.4)"]}
        className="absolute bottom-0 w-full h-1/2"
      />
    </>
  );
};

export default OverlayUserProfile;
