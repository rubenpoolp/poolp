import React, { useState } from "react";
import { View, TextInput } from "react-native";
import { useTranslation } from "react-i18next";
import MyScreen from "@src/components/MyScreen";
import MyText from "@src/components/natives/MyText";
import MyOnboardingLayout from "@src/pages/onboarding/MyOnboardingLayout";

const Name = ({ navigation }: { navigation: any }) => {
  const { t } = useTranslation();
  const [name, setName] = useState("");

  return (
    <MyOnboardingLayout
      onNextPress={() => {
        navigation.navigate("Introduction");
      }}
    >
      <View className="flex w-full">
        <MyText className="text-2xl font-semibold mb-5">
          {t("name.title")}
        </MyText>

        <TextInput
          value={name}
          onChangeText={setName}
          className="w-full border border-gray-300 rounded-md p-2 mt-4"
        />
      </View>
    </MyOnboardingLayout>
  );
};

export default Name;
