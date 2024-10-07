import React, { useState } from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";
import MyText from "@src/components/natives/MyText";
import MyOnboardingLayout from "@src/pages/onboarding/MyOnboardingLayout";
import resetTo from "@src/utils/resetTo";

const VerificationCode = ({ navigation }: { navigation: any }) => {
  const { t } = useTranslation();

  const handleNext = () => {
    // resetTo(navigation, "HomeStack");
  };

  return (
    <MyOnboardingLayout onNextPress={handleNext}>
      <View className="flex w-full" style={{ gap: 80 }}>
        <MyText className="text-3xl font-semibold mb-5">
          {t("share.title")}
        </MyText>
      </View>
    </MyOnboardingLayout>
  );
};

export default VerificationCode;
