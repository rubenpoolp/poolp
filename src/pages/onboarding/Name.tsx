import React, { useState } from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";
import MyText from "@src/components/natives/MyText";
import MyOnboardingLayout from "@src/pages/onboarding/MyOnboardingLayout";
import NameInput from "@src/components/inputs/NameInput";
import { OnboardingNavigateTo } from "../navigation/OnboardingNavigator";

const Name = ({ navigation }: { navigation: any }) => {
  const { t } = useTranslation();
  const [name, setName] = useState("");

  const handleNext = () => {
    if (name && name.length >= 2 && name.length <= 20) {
      OnboardingNavigateTo(navigation, "Name", { user: { name } });
    }
  };

  return (
    <MyOnboardingLayout onNextPress={handleNext}>
      <View className="flex w-full" style={{ gap: 80 }}>
        <MyText className="text-3xl font-semibold mb-5">
          {t("name.title")}
        </MyText>
        <NameInput
          autoFocus
          value={name}
          onChangeText={setName}
          onSubmitEditing={handleNext}
        />
      </View>
    </MyOnboardingLayout>
  );
};

export default Name;
