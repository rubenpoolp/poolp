import MyScreen from "@components/MyScreen";
import MyText from "@components/natives/MyText";
import React from "react";
import { View } from "react-native";

const CameraPage = () => {
  return (
    <MyScreen className="px-4">
      <View className="flex-row justify-between items-center w-full">
        <View className="w-10" />
        <MyText className="text-3xl font-semibold">Camera</MyText>
        <View className="w-10" />
      </View>

      <View className="self-start">
        <MyText>Camera.tsx</MyText>
      </View>
    </MyScreen>
  );
};

export default CameraPage;
