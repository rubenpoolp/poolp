import assets from "@assets/index";
import MyScreen from "@src/components/MyScreen";
import MyImage from "@src/components/natives/MyImage";
import MyText from "@src/components/natives/MyText";
import React from "react";
import { View } from "react-native";

const Introduction = ({ navigation }: { navigation: any }) => {
  console.log("Introduction");
  return (
    <MyScreen className="justify-center">
      <View>
        <MyImage img={assets.icon} containerStyle="h-80" />
        <MyText className="text-2xl font-semibold mb-5">poolp</MyText>
      </View>
      <MyText className={"text-2xl font-semibold mb-5"}>
        Introduction page
      </MyText>
    </MyScreen>
  );
};

export default Introduction;
