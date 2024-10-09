import MyBirthdayInput from "@components/inputs/MyBirthdayInput";
import MyText from "@components/natives/MyText";
import MyOnboardingLayout from "@pages/onboarding/MyOnboardingLayout";
import { differenceInYears, parse } from "date-fns";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, View } from "react-native";

const Birthday = ({ navigation, route }: { navigation: any; route: any }) => {
  const { t } = useTranslation();
  const [birthday, setBirthday] = useState("");

  const { user, nextScreen } = route.params;

  const checkBirthday = () => {
    if (!birthday || birthday.length !== 10) {
      Alert.alert(t("birthday.errorMissing"));
      return;
    }

    const parsedDate = parse(birthday, "dd/MM/yyyy", new Date());
    const age = differenceInYears(new Date(), parsedDate);

    if (age < 13 || age > 90) {
      Alert.alert(
        t(age < 13 ? "birthday.errorTooYoung" : "birthday.errorTooOld"),
      );
      return;
    }

    const timestampzForSupabase = parsedDate.toISOString();
    navigation.navigate(nextScreen, {
      user: { ...user, birthday: timestampzForSupabase },
    });
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
