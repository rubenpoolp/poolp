import assets from "@assets/index";
import MyScreen from "@src/components/MyScreen";
import MyButton from "@src/components/natives/MyButton";
import MyImage from "@src/components/natives/MyImage";
import MyText from "@src/components/natives/MyText";
import { checkCode, sendSMS } from "@src/utils/phone";
import React from "react";
import { View } from "react-native";

const Introduction = () => {
  return (
    <MyScreen className="justify-center">
      <View>
        <MyImage img={assets.icon} containerStyle="h-80" />
        <MyText className="text-2xl font-semibold mb-5">poolp</MyText>
      </View>
      <MyButton onPress={sendSMS} txt="Envoyer un SMS" />
      <MyButton onPress={checkCode} txt="Vérifier le code" />
      <MyText className={"text-2xl font-semibold mb-5"}>
        Introduction page
      </MyText>
    </MyScreen>
  );
};

export default Introduction;
