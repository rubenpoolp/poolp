import { Bump } from "@components/animations/Bump";
import MyGradient from "@components/MyGradient";
import MyPressable from "@components/natives/MyPressable";
import MyText from "@components/natives/MyText";
import colors from "@config/colors";
import { useAuth } from "@context/Auth";
import MyOnboardingLayout from "@pages/onboarding/MyOnboardingLayout";
import { GenderFemale, GenderMale } from "phosphor-react-native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, View } from "react-native";

type GenderType = "female" | "male" | "other" | null;

const GenderItem = ({
  Icon,
  text,
  isSelected,
  onPress,
}: {
  Icon?: React.ReactNode;
  text: string;
  isSelected: boolean;
  onPress: () => void;
}) => {
  return (
    <Bump scaleValue={0.98}>
      <MyPressable
        onPress={onPress}
        className={`w-full flex-row items-center h-14 px-4 rounded-3xl bg-gray-400`}
      >
        {isSelected && <MyGradient className="rounded-3xl" />}
        <View className="mr-2">{Icon && Icon}</View>
        <MyText className={`text-lg font-semibold text-light`}>{text}</MyText>
      </MyPressable>
    </Bump>
  );
};

const Gender = ({ navigation, route }: { navigation: any; route: any }) => {
  const { t } = useTranslation();
  const [selectedGender, setSelectedGender] = useState<GenderType>(null);
  const { signUp } = useAuth();
  const { user, nextScreen } = route.params;

  const handleNext = () => {
    if (!selectedGender) {
      Alert.alert(t("onboarding.gender.error"));
      return;
    }
    const userWithGender = { ...user, gender: selectedGender };
    signUp(userWithGender);
    navigation.navigate(nextScreen, {
      user,
    });
  };

  return (
    <MyOnboardingLayout onNextPress={handleNext}>
      <View className="flex w-full" style={{ gap: 40 }}>
        <MyText className="text-3xl font-semibold">
          {t("onboarding.gender.title")}
        </MyText>

        <View className="w-full" style={{ gap: 16 }}>
          <GenderItem
            Icon={<GenderFemale color={colors.light} weight="bold" />}
            text={t("onboarding.gender.female")}
            isSelected={selectedGender === "female"}
            onPress={() => setSelectedGender("female")}
          />
          <GenderItem
            Icon={<GenderMale color={colors.light} weight="bold" />}
            text={t("onboarding.gender.male")}
            isSelected={selectedGender === "male"}
            onPress={() => setSelectedGender("male")}
          />
          <GenderItem
            text={t("onboarding.gender.other")}
            isSelected={selectedGender === "other"}
            onPress={() => setSelectedGender("other")}
          />
        </View>
      </View>
    </MyOnboardingLayout>
  );
};

export default Gender;
