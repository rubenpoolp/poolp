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
          {t("onboarding.introduction.description1")}
        </MyText>

        <MyText className={"text-center"}>
          {t("onboarding.introduction.description2")}
        </MyText>

        <MyText className={"text-center"}>
          {t("onboarding.introduction.description3")}
        </MyText>
        <MyText className={"text-center"}>
          {t("onboarding.introduction.description4")}
        </MyText>
        <MyText className={"text-center"}>
          {t("onboarding.introduction.description5")}
        </MyText>
      </View>
      <MyText
        className={
          "text-center w-full absolute bottom-3 text-[10px] text-gray-400"
        }
      >
        {t("onboarding.introduction.byPassingLegal")}
      </MyText>
    </MyOnboardingLayout>
  );
};

export default Introduction;
