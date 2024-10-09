import MyButton from "@components/natives/MyButton";
import MyPressable from "@components/natives/MyPressable";
import MyText from "@components/natives/MyText";
import MyOnboardingLayout from "@pages/onboarding/MyOnboardingLayout";
import { GraduationCap, Plus } from "phosphor-react-native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, View } from "react-native";

const School = ({ navigation, route }: { navigation: any; route: any }) => {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const { user, nextScreen } = route.params;

  const handleNext = () => {
    navigation.navigate(nextScreen, { user: { ...user } });
  };

  return (
    <MyOnboardingLayout onNextPress={handleNext}>
      <View className="flex w-full" style={{ gap: 80 }}>
        <View className="items-start space-y-2">
          <MyText className="text-3xl font-semibold">
            {t("school.title")}
          </MyText>
          <MyText className="text-gray-500 text-xs">
            {t("school.subtitle")}
          </MyText>
        </View>

        <View className="flex flex-col space-y-2">
          <MyPressable className="flex-row items-center justify-between bg-gradient-primary-1/30 rounded-xl py-3.5 px-5">
            <View className="flex-row items-center space-x-4">
              <GraduationCap size={20} />
              <MyText className="text-lg font-semibold">
                {t("school.button")}
              </MyText>
            </View>

            <Plus weight="bold" size={20} />
          </MyPressable>
          <MyText className="text-gray-400 text-xs px-2 italic">
            {t("school.details")}
          </MyText>
        </View>
      </View>
    </MyOnboardingLayout>
  );
};

export default School;
