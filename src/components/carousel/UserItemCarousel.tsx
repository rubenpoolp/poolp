import MyImage from "@components/natives/MyImage";
import MyText from "@components/natives/MyText";
import React from "react";
import { View, Text, Image } from "react-native";
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
        className="relative rounded-md border-4 border-gradient-primary-0 shadow-md shadow-gradient-primary-1 bg-gray-400"
        style={{ width, height }}
      >
        {user.pictures.length > 0 && (
          <MyImage img={{ uri: user.pictures[0] }} resizeMode="cover" />
        )}
        <MyText className="absolute bottom-5 left-5 font-semibold text-xl">
          {user.name}
        </MyText>
      </View>
    </Animated.View>
  );
};

export default UserItemCarousel;
