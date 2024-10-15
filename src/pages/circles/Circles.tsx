import MyScreen from "@components/MyScreen";
import MyText from "@components/natives/MyText";
import React from "react";
import { View } from "react-native";

const Circles = () => {
  return (
    <MyScreen className="px-4">
      <View className="flex-row justify-between items-center w-full">
        <View className="w-10" />
        <MyText className="text-3xl font-semibold">Circles</MyText>
        <View className="w-10" />
      </View>

      <View className="self-start">
        <MyText>Circles.tsx</MyText>
      </View>
    </MyScreen>
  );
};

export default Circles;
