import { UserProfilePics } from "@/types/story";
import useRingUser from "@api/notifications/ringUser.hook";
import RingButton from "@components/buttons/BellButton";
import UserProfileButton from "@components/buttons/UserProfileButton";
import MyText from "@components/natives/MyText";
import shadow from "@config/shadow";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image, View } from "react-native";
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

  const ringUser = useRingUser();

  return (
    <UserProfileButton className="flex-1" userProfilePics={userProfilePics}>
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
          <View className="flex-1">
            {userProfilePics.urls && userProfilePics.urls.length > 0 && (
              <View className="absolute top-0 left-0 right-0 bottom-0">
                <Image
                  source={{ uri: userProfilePics.urls[0] }}
                  style={{ flex: 1, width: "100%" }}
                  resizeMode="cover"
                />
              </View>
            )}

            <View className="flex-1 p-5 justify-between z-10">
              <View />

              <View className="flex-row items-center justify-between">
                <MyText className="text-xl font-semibold">
                  {userProfilePics.user_name}
                </MyText>

                <RingButton
                  onPress={() => {
                    ringUser.mutate({
                      userIds: [userProfilePics.user_id],
                    });
                  }}
                />
              </View>
            </View>

            <LinearGradient
              colors={["transparent", "rgba(0,0,0,0.4)"]}
              className="absolute bottom-0 w-full h-1/2"
            />
          </View>
        </View>
      </Animated.View>
    </UserProfileButton>
  );
};

export default UserItemCarousel;
