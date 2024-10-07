import React, { useState } from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";
import { parse, differenceInYears } from "date-fns";
import MyText from "@src/components/natives/MyText";
import MyOnboardingLayout from "@src/pages/onboarding/MyOnboardingLayout";
import MyBirthdayInput from "@src/components/inputs/MyBirthdayInput";
import { OnboardingNavigateTo } from "@src/pages/navigation/OnboardingNavigator";

const Birthday = ({ navigation, route }: { navigation: any; route: any }) => {
  const { t } = useTranslation();
  const [birthday, setBirthday] = useState("");

  const { user } = route.params;

  const checkBirthday = () => {
    if (birthday && birthday.length === 10) {
      const parsedDate = parse(birthday, "dd/MM/yyyy", new Date());
      const today = new Date();
      const age = differenceInYears(today, parsedDate);

      if (age > 13 && age < 90) {
        OnboardingNavigateTo(navigation, "Birthday", {
          user: { ...user, birthday: parsedDate },
        });
      }
    }
  };

  return (
    <MyOnboardingLayout onNextPress={checkBirthday}>
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
          onSubmitEditing={checkBirthday}
        />
      </View>
    </MyOnboardingLayout>
  );
};

export default Birthday;
