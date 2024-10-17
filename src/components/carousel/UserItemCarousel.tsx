import StoryBarLoader from "@components/animations/StoriesBarLoader";
import MyImage from "@components/natives/MyImage";
import MyText from "@components/natives/MyText";
import React, { useState } from "react";
import { View, Pressable } from "react-native";
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
        className="relative rounded-md border-4 border-gradient-primary-0 shadow-md shadow-gradient-primary-1 bg-gray-600"
        style={{ width, height }}
      >
        <View className="absolute w-full flex-1 h-full flex-row z-10">
          <Pressable className="flex-1" onPress={onLeft} />
          <Pressable className="flex-1" onPress={onRight} />
        </View>

        <View className="flex-1 py-5 px-2">
          <StoryBarLoader
            index={actualIndex}
            isStatic={true}
            duration={10000}
            total={user.pictures.length}
          />

          {user.pictures.length > 0 && (
            <MyImage
              img={{ uri: user.pictures[actualIndex] }}
              resizeMode="cover"
            />
          )}
          <MyText className="absolute bottom-5 left-5 font-semibold text-xl">
            {user.name}
          </MyText>
        </View>
      </View>
    </Animated.View>
  );
};

export default UserItemCarousel;
