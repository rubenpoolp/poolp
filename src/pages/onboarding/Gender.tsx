import { Bump } from "@src/components/animations/Bump";
import MyGradient from "@src/components/MyGradient";
import MyPressable from "@src/components/natives/MyPressable";
import MyText from "@src/components/natives/MyText";
import MyOnboardingLayout from "@src/pages/onboarding/MyOnboardingLayout";
import { GenderFemale, GenderMale } from "phosphor-react-native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { SvgProps } from "react-native-svg";
import { OnboardingNavigateTo } from "@src/pages/navigation/OnboardingNavigator";
import colors from "@config/colors";

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
        // style={isSelected && shadow.purple}
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

  const { user } = route.params;

  const handleNext = () => {
    if (selectedGender) {
      OnboardingNavigateTo(navigation, "Gender", {
        user: { ...user, gender: selectedGender },
      });
    }
  };

  return (
    <MyOnboardingLayout onNextPress={handleNext}>
      <View className="flex w-full" style={{ gap: 40 }}>
        <MyText className="text-3xl font-semibold">{t("gender.title")}</MyText>

        <View className="w-full" style={{ gap: 16 }}>
          <GenderItem
            Icon={<GenderFemale color={colors.light} weight="bold" />}
            text={t("gender.female")}
            isSelected={selectedGender === "female"}
            onPress={() => setSelectedGender("female")}
          />
          <GenderItem
            Icon={<GenderMale color={colors.light} weight="bold" />}
            text={t("gender.male")}
            isSelected={selectedGender === "male"}
            onPress={() => setSelectedGender("male")}
          />
          <GenderItem
            text={t("gender.other")}
            isSelected={selectedGender === "other"}
            onPress={() => setSelectedGender("other")}
          />
        </View>
      </View>
    </MyOnboardingLayout>
  );
};

export default Gender;
