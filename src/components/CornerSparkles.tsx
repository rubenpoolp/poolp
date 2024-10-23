import React from "react";
import { View, Image } from "react-native";
import assets from "@assets/index";

interface CornerSparklesProps {
  children: React.ReactNode;
  size?: number;
}

const CornerSparkles: React.FC<CornerSparklesProps> = ({
  children,
  size = 36,
}) => {
  const Corner = ({
    position,
  }: {
    position: "topLeft" | "topRight" | "bottomLeft" | "bottomRight";
  }) => {
    const getRotation = () => {
      switch (position) {
        case "topLeft":
          return "rotate-0";
        case "topRight":
          return "rotate-90";
        case "bottomRight":
          return "rotate-180";
        case "bottomLeft":
          return "-rotate-[65deg]";
      }
    };

    const getPosition = () => {
      switch (position) {
        case "topLeft":
          return "-top-[18px] -left-[12px]";
        case "topRight":
          return "-top-[18px] -right-[18px]";
        case "bottomRight":
          return "-bottom-[18px] -right-[18px]";
        case "bottomLeft":
          return "-bottom-[18px] -left-[18px]";
      }
    };

    return (
      <Image
        source={assets.sparkles}
        style={{ width: size, height: size }}
        className={`absolute ${getPosition()} ${getRotation()}`}
      />
    );
  };

  return (
    <View className={`relative px-3`}>
      <View className="relative">{children}</View>
      <Corner position="topLeft" />
      <Corner position="topRight" />
      <Corner position="bottomRight" />
      <Corner position="bottomLeft" />
    </View>
  );
};

export default CornerSparkles;
