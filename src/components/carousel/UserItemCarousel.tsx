import { UserStories } from "@/types/story";
import StoryBarLoader from "@components/animations/StoriesBarLoader";
import RingButton from "@components/buttons/BellButton";
import StoryButton from "@components/buttons/StoryButton";
import MyText from "@components/natives/MyText";
import shadow from "@config/shadow";
import React, { useState } from "react";
import { Image, Pressable, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import * as Haptics from "expo-haptics";

interface UserItemCarouselProps {
  userStories: UserStories;
  dimensions: {
    width: number;
    height: number;
  };
}

const UserItemCarousel: React.FC<UserItemCarouselProps> = ({
  userStories,
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
    if (actualIndex + 1 >= userStories.length) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      return;
    }
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setActualIndex(actualIndex + 1);
  };

  const storiesOfOnlyActualUser = userStories
    .flat()
    .filter((s) => s.userName === userStories[actualIndex].userName);

  return (
    <Animated.View
      entering={FadeInDown.duration(300)}
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
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
          <Pressable className="flex-1" onPress={onLeft} />
          <Pressable className="flex-1 h-4/5" onPress={onRight} />
        </View>

        <View className="flex-1">
          {userStories.length > 0 && (
            <View className="absolute top-0 left-0 right-0 bottom-0">
              <Image
                source={userStories[actualIndex].picture}
                style={{ flex: 1, width: "100%" }}
                resizeMode="cover"
              />
            </View>
          )}

          <View className="flex-1 p-5 justify-between">
            <StoryBarLoader
              index={actualIndex}
              duration={0}
              total={userStories.length}
            />

            <View className="flex-row items-center justify-between">
              <MyText className="text-xl font-semibold">
                {userStories[actualIndex].userName}
              </MyText>

              {/* <StoryButton variant="user" stories={[storiesOfOnlyActualUser]}> */}
              <RingButton
                onPress={() => {
                  console.log("onPress");
                }}
                containerStyle=""
              />
              {/* </StoryButton> */}
            </View>
          </View>
        </View>
      </View>
    </Animated.View>
  );
};

export default UserItemCarousel;
