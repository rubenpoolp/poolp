import { UserProfilePics } from "@/types/story";
import DotsThreeOnUser from "@components/buttons/DotsThreeOnUser";
import { LinearGradient } from "expo-linear-gradient";
import { X } from "phosphor-react-native";
import React from "react";
import { Platform, Pressable, View } from "react-native";
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
  if (!userProfilePics || !userProfilePics.urls) return null;

  return (
    <>
      <SafeAreaView
        edges={userProfilePics ? ["top", "bottom"] : ["top"]}
        className={`absolute w-full h-full z-10 ${Platform.OS === "android" && "pt-6"}`}
      >
        <View className="absolute w-full flex-1 h-[70%] bottom-28 justify-end flex-row z-20">
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
                <DotsThreeOnUser userId={userProfilePics.user_id} />

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
