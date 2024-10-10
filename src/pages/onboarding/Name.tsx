import NameInput from "@components/inputs/NameInput";
import MyText from "@components/natives/MyText";
import MyOnboardingLayout from "@pages/onboarding/MyOnboardingLayout";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, View } from "react-native";

const Name = ({ navigation, route }: { navigation: any; route: any }) => {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const { user, nextScreen } = route.params;

  const handleNext = () => {
    if (!name || name.length < 2 || name.length > 20) {
      Alert.alert(t("onboarding.name.error"));
      return;
    }
    navigation.navigate(nextScreen, { user: { ...user, name } });
  };

  return (
    <MyOnboardingLayout onNextPress={handleNext}>
      <View className="flex w-full" style={{ gap: 80 }}>
        <MyText className="text-3xl font-semibold mb-5">
          {t("onboarding.name.title")}
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
