import StoryBarLoader from "@components/animations/StoriesBarLoader";
import RingButton from "@components/buttons/BellButton";
import MyText from "@components/natives/MyText";
import shadow from "@config/shadow";
import React, { useState } from "react";
import { View, Pressable, Image, ImageProps } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

// Définition de l'interface pour l'objet utilisateur
interface UserItem {
  name: string;
  pictures: string[];
}

// Mise à jour de l'interface pour les props du composant
interface UserItemCarouselProps {
  user: UserItem;
  dimensions: {
    width: number;
    height: number;
  };
}

const UserItemCarousel: React.FC<UserItemCarouselProps> = ({
  user,
  dimensions,
}) => {
  const width = dimensions.width * 0.9;
  const height = dimensions.height * 0.5;

  const [actualIndex, setActualIndex] = useState<number>(0);

  const onLeft = () => {
    if (actualIndex <= 0) return;
    setActualIndex(actualIndex - 1);
    console.log("onLeft", actualIndex);
  };

  const onRight = () => {
    if (actualIndex >= user.pictures.length - 1) return;
    setActualIndex(actualIndex + 1);
    console.log("onRight", actualIndex);
  };

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
        <View className="absolute w-full flex-1 h-full flex-row z-10">
          <Pressable className="flex-1" onPress={onLeft} />
          <Pressable className="flex-1" onPress={onRight} />
        </View>

        <View className="flex-1 ">
          {user.pictures.length > 0 && (
            <View className="absolute top-0 left-0 right-0 bottom-0">
              <Image
                source={user.pictures[actualIndex] as unknown as ImageProps}
                style={{ flex: 1, width: "100%" }}
                resizeMode="cover"
              />
            </View>
          )}

          <View className="flex-1 p-5 justify-between">
            <StoryBarLoader
              index={actualIndex}
              isStatic={true}
              duration={10000}
              total={user.pictures.length}
            />

            <View className="flex-row items-center justify-between">
              <MyText className="text-xl font-semibold">{user.name}</MyText>

              <RingButton
                onPress={() => {
                  console.log("wizz user");
                }}
                containerStyle=""
              />
            </View>
          </View>
        </View>
      </View>
    </Animated.View>
  );
};

export default UserItemCarousel;
