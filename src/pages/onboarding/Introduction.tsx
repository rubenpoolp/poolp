import LogoWithText from "@src/components/LogoWithText";
import MyText from "@src/components/natives/MyText";
import MyOnboardingLayout from "@src/pages/onboarding/MyOnboardingLayout";
import React from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

export const Introduction = ({ navigation }: { navigation: any }) => {
  const { t } = useTranslation();

  return (
    <MyOnboardingLayout
      onNextPress={() => navigation.navigate("Name")}
      contentContainerStyle="pt-20"
      logo={false}
      canGoBack={false}
    >
      <LogoWithText />

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
