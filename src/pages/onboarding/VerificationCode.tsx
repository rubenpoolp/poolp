import React, { useState } from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";
import MyText from "@src/components/natives/MyText";
import MyOnboardingLayout from "@src/pages/onboarding/MyOnboardingLayout";
import NameInput from "@src/components/inputs/NameInput";

const VerificationCode = ({ navigation }: { navigation: any }) => {
  const { t } = useTranslation();
  const [name, setName] = useState("");

  return (
    <MyOnboardingLayout
      onNextPress={() => {
        navigation.navigate("Share");
      }}
    >
      <View className="flex w-full" style={{ gap: 80 }}>
        <MyText className="text-3xl font-semibold mb-5">
          {t("verificationCode.title")}
        </MyText>

        <NameInput
          autoFocus
          value={name}
          onChangeText={setName}
          onSubmitEditing={() => {}}
        />
      </View>
    </MyOnboardingLayout>
  );
};

export default VerificationCode;
