import LogoWithText from "@components/LogoWithText";
import MyText from "@components/natives/MyText";
import MyOnboardingLayout from "@pages/onboarding/MyOnboardingLayout";
import React from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

const Introduction = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const { t } = useTranslation();
  const { user, nextScreen } = route.params;

  const handleNext = () => {
    navigation.navigate(nextScreen, { user });
  };

  return (
    <MyOnboardingLayout
      onNextPress={handleNext}
      contentContainerStyle="pt-20"
      logo={false}
      canGoBack={false}
    >
      <LogoWithText />

      <View className="flex items-center space-y-4">
        <MyText className={"text-center"}>
          {t("onboarding.introduction.description1.1")}
          <MyText className="font-bold">
            {t("onboarding.introduction.description1.2")}
          </MyText>
          {t("onboarding.introduction.description1.3")}
        </MyText>

        <MyText className={"text-center"}>
          {t("onboarding.introduction.description2.1")}
          <MyText className="font-bold">
            {t("onboarding.introduction.description2.2")}
          </MyText>
          {t("onboarding.introduction.description2.3")}
        </MyText>

        <MyText className={"text-center"}>
          {t("onboarding.introduction.description3.1")}
          <MyText className="font-bold">
            {t("onboarding.introduction.description3.2")}
          </MyText>
          {t("onboarding.introduction.description3.3")}
        </MyText>
        <MyText className={"text-center"}>
          <MyText className="font-bold">
            {t("onboarding.introduction.description4.1")}
          </MyText>
          {t("onboarding.introduction.description4.2")}
        </MyText>
        <MyText className={"text-center"}>
          {t("onboarding.introduction.description5.1")}
          <MyText className="font-bold">
            {t("onboarding.introduction.description5.2")}
          </MyText>
        </MyText>
      </View>
      <MyText
        className={
          "text-center w-full absolute bottom-3 text-[10px] text-gray-400"
        }
      >
        {t("onboarding.introduction.byPassingLegal.1")}
        <MyText className="underline text-[10px] text-gray-400">
          {t("onboarding.introduction.byPassingLegal.2")}
        </MyText>
        {t("onboarding.introduction.byPassingLegal.3")}
        <MyText className="underline text-[10px] text-gray-400">
          {t("onboarding.introduction.byPassingLegal.4")}
        </MyText>
      </MyText>
    </MyOnboardingLayout>
  );
};

export default Introduction;
