import { Bump } from "@components/animations/Bump";
import SchoolListModal from "@components/modals/SchoolListModal";
import MyPressable from "@components/natives/MyPressable";
import MyText from "@components/natives/MyText";
import MyOnboardingLayout from "@pages/onboarding/MyOnboardingLayout";
import { GraduationCap, Plus } from "phosphor-react-native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, View } from "react-native";
import { School as SchoolType } from "@supabase_types";

const School = ({ navigation, route }: { navigation: any; route: any }) => {
  const { t } = useTranslation();
  const { user, nextScreen } = route.params;

  const [school, setSchool] = useState<any>();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const handleNext = () => {
    if (!school) {
      Alert.alert(t("onboarding.school.error"));
      return;
    }
    navigation.navigate(nextScreen, { user: { ...user } });
  };

  return (
    <MyOnboardingLayout onNextPress={handleNext}>
      <View className="flex w-full" style={{ gap: 80 }}>
        <View className="items-start space-y-2">
          <MyText className="text-3xl font-semibold">
            {t("onboarding.school.title")}
          </MyText>
          <MyText className="text-gray-500 text-xs">
            {t("onboarding.school.subtitle")}
          </MyText>
        </View>

        <View className="flex flex-col space-y-2">
          <Bump scaleValue={0.95}>
            <MyPressable
              className="flex-row items-center justify-between bg-gradient-primary-1/30 rounded-xl py-3.5 px-5"
              onPress={() => setIsVisible(true)}
            >
              <View className="flex-row items-center space-x-4">
                <GraduationCap size={20} />
                <MyText className="text-lg font-semibold">
                  {school ? school.name : t("onboarding.school.button")}
                </MyText>
              </View>

              <Plus weight="bold" size={20} />
            </MyPressable>
          </Bump>

          <MyText className="text-gray-400 text-xs px-2 italic">
            {t("onboarding.school.details")}
          </MyText>
        </View>
      </View>

      <SchoolListModal
        isVisible={isVisible}
        onClose={() => setIsVisible(false)}
        onSelect={(_school: SchoolType) => {
          setSchool(_school);
          setIsVisible(false);
        }}
      />
    </MyOnboardingLayout>
  );
};

export default School;
