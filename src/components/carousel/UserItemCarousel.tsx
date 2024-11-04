import { UserProfilePics } from "@/types/story";
import RingButton from "@components/buttons/BellButton";
import StoryButton from "@components/buttons/StoryButton";
import MyText from "@components/natives/MyText";
import shadow from "@config/shadow";
import * as Haptics from "expo-haptics";
import React, { useState } from "react";
import { Image, Pressable, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

interface UserItemCarouselProps {
  userProfilePics: UserProfilePics;
  dimensions: {
    width: number;
    height: number;
  };
}

const UserItemCarousel: React.FC<UserItemCarouselProps> = ({
  userProfilePics,
  dimensions,
}) => {
  const width = dimensions.width * 0.9;
  const height = dimensions.height * 0.5;

  const [actualIndex, setActualIndex] = useState<number>(0);

  const onLeft = () => {
    if (actualIndex - 1 < 0) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      return;
    }
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setActualIndex(actualIndex - 1);
  };

  const onRight = () => {
    if (
      userProfilePics.urls &&
      actualIndex + 1 >= userProfilePics.urls.length
    ) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      return;
    }
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setActualIndex(actualIndex + 1);
  };

  return (
    <StoryButton className="flex-1" userProfilePics={userProfilePics}>
      <Animated.View
        entering={FadeInDown.duration(100)}
        className="flex-1 items-center justify-center"
      >
        <View
          className="relative rounded-md border-4 border-purple-100 bg-gray-600 z-10"
          style={{
            ...shadow.smallPurple,
            width,
            height,
          }}
        >
          {/* TODO: Add z index 10 to the container */}
          <View className="absolute w-full flex-1 h-full flex-row z-20">
            <Pressable className="flex-1" disabled onPress={onLeft} />
            <Pressable className="flex-1 h-4/5" disabled onPress={onRight} />
          </View>

          <View className="flex-1">
            {userProfilePics.urls && userProfilePics.urls.length > 0 && (
              <View className="absolute top-0 left-0 right-0 bottom-0">
                <Image
                  source={{ uri: userProfilePics.urls[actualIndex] }}
                  style={{ flex: 1, width: "100%" }}
                  resizeMode="cover"
                />
              </View>
            )}

            <View className="flex-1 p-5 justify-between">
              {/* <StoryBarLoader
              index={actualIndex}
              duration={0}
              total={userStories.length}
            /> */}
              <View />

              <View className="flex-row items-center justify-between">
                <MyText className="text-xl font-semibold">
                  {userProfilePics.user_name}
                </MyText>

                {/* <StoryButton variant="user" stories={[storiesOfOnlyActualUser]}> */}
                <RingButton onPress={() => {}} containerStyle="" />
                {/* </StoryButton> */}
              </View>
            </View>
          </View>
        </View>
      </Animated.View>
    </StoryButton>
  );
};

export default UserItemCarousel;
