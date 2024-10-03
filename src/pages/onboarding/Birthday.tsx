import React, { useState } from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";
import MyText from "@src/components/natives/MyText";
import MyOnboardingLayout from "@src/pages/onboarding/MyOnboardingLayout";
import NameInput from "@src/components/inputs/NameInput";
import MyBirthdayInput from "@src/components/inputs/MyBirthdayInput";

const Birthday = ({ navigation }: { navigation: any }) => {
  const { t } = useTranslation();
  const [name, setName] = useState("");

  return (
    <MyOnboardingLayout
      onNextPress={() => {
        navigation.navigate("Gender");
      }}
    >
      <View className="flex w-full" style={{ gap: 80 }}>
        <View className="items-start space-y-2">
          <MyText className="text-3xl font-semibold">
            {t("birthday.title")}
          </MyText>
          <MyText className="text-gray-500 text-xs">
            {t("birthday.subtitle")}
          </MyText>
        </View>

        <MyBirthdayInput
          autoFocus
          value={name}
          onChangeText={setName}
          onSubmitEditing={() => {}}
        />
      </View>
    </MyOnboardingLayout>
  );
};

export default Birthday;
