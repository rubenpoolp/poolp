import React, { useState } from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";
import MyText from "@src/components/natives/MyText";
import MyOnboardingLayout from "@src/pages/onboarding/MyOnboardingLayout";
import MyBirthdayInput from "@src/components/inputs/MyBirthdayInput";

const Birthday = ({ navigation }: { navigation: any }) => {
  const { t } = useTranslation();
  const [birthday, setBirthday] = useState("");

  return (
    <MyOnboardingLayout
      onNextPress={() => {
        if (birthday && birthday.length === 10) {
          navigation.navigate("Gender");
        }
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
          value={birthday}
          onChangeText={setBirthday}
          onSubmitEditing={() => {}}
        />
      </View>
    </MyOnboardingLayout>
  );
};

export default Birthday;
