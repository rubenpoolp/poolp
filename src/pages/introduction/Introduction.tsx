import assets from "@assets/index";
import MyScreen from "@src/components/MyScreen";
import MyImage from "@src/components/natives/MyImage";
import MyText from "@src/components/natives/MyText";
import React from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";

const Introduction = ({ navigation }: { navigation: any }) => {
  const { t } = useTranslation();

  return (
    <MyScreen className="flex flex-col justify-center gap-8">
      <View>
        <MyImage img={assets.icon} containerStyle="h-24" />
        <MyText className="text-4xl font-semibold mb-5">
          {t("introduction.title")}
        </MyText>
      </View>

      <View className="flex flex-col items-center px-6 gap-4">
        <MyText className={"text-base text-center"}>
          {t("introduction.description1")}
        </MyText>

        <MyText className={"text-base text-center"}>
          {t("introduction.description2")}
        </MyText>

        <MyText className={"text-base text-center"}>
          {t("introduction.description3")}
        </MyText>
        <MyText className={"text-base text-center"}>
          {t("introduction.description4")}
        </MyText>
        <MyText className={"text-base text-center"}>
          {t("introduction.description5")}
        </MyText>
      </View>
    </MyScreen>
  );
};

export default Introduction;
