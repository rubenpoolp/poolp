import NameInput from "@components/inputs/NameInput";
import MyText from "@components/natives/MyText";
import MyOnboardingLayout from "@pages/onboarding/MyOnboardingLayout";
import sleep from "@utils/sleep";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, TextInput, View } from "react-native";

const Name = ({ navigation, route }: { navigation: any; route: any }) => {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const { user, nextScreen } = route.params;
  const nameInputRef = useRef<TextInput>(null);

  useEffect(() => {
    sleep(700).then(() => {
      nameInputRef.current?.focus();
    });
  }, []);

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
          ref={nameInputRef}
          value={name}
          onChangeText={setName}
          onSubmitEditing={handleNext}
        />
      </View>
    </MyOnboardingLayout>
  );
};

export default Name;
