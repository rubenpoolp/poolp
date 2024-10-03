import assets from "@assets/index";
import MyScreen from "@src/components/MyScreen";
import MyImage from "@src/components/natives/MyImage";
import MyText from "@src/components/natives/MyText";
import React from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";
import MyOnboardingLayout from "@src/pages/onboarding/MyOnboardingLayout";

export const Introduction = ({ navigation }: { navigation: any }) => {
  const { t } = useTranslation();

  return (
    <MyOnboardingLayout
      onNextPress={() => navigation.navigate("Name")}
      contentContainerStyle="space-y-10 justify-center"
      logo={false}
    >
      <View className="w-full items-center space-y-5">
        <MyImage img={assets.icon} containerStyle="h-36" />
        <MyText className="text-4xl font-semibold">
          {t("introduction.title")}
        </MyText>
      </View>

      <View className="flex flex-col items-center space-y-4">
        <MyText className={"text-center"}>
          {t("introduction.description1")}
        </MyText>

        <MyText className={"text-center"}>
          {t("introduction.description2")}
        </MyText>

        <MyText className={"text-center"}>
          {t("introduction.description3")}
        </MyText>
        <MyText className={"text-center"}>
          {t("introduction.description4")}
        </MyText>
        <MyText className={"text-center"}>
          {t("introduction.description5")}
        </MyText>
      </View>
    </MyOnboardingLayout>
  );
};
