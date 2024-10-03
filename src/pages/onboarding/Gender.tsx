import shadow from "@config/shadow";
import { Bump } from "@src/components/animations/Bump";
import MyGradient from "@src/components/MyGradient";
import MyPressable from "@src/components/natives/MyPressable";
import MyText from "@src/components/natives/MyText";
import MyOnboardingLayout from "@src/pages/onboarding/MyOnboardingLayout";
import { GenderFemale, GenderMale } from "phosphor-react-native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

type GenderType = "female" | "male" | "other" | null;

const GenderItem = ({
  icon,
  text,
  isSelected,
  onPress,
}: {
  icon?: React.ElementType;
  text: string;
  isSelected: boolean;
  onPress: () => void;
}) => {
  return (
    <Bump scaleValue={0.98}>
      <MyPressable
        onPress={onPress}
        className={`w-full flex-row items-center h-14 px-4 rounded-3xl bg-gray-400`}
        style={isSelected && shadow.purple}
      >
        {isSelected && <MyGradient className="rounded-3xl" />}
        <View className="mr-2">
          {icon &&
            React.createElement(icon, {
              size: 24,
              color: "white",
              weight: "bold",
            })}
        </View>
        <MyText className={`text-lg font-semibold text-light`}>{text}</MyText>
      </MyPressable>
    </Bump>
  );
};

const Gender = ({ navigation }: { navigation: any }) => {
  const { t } = useTranslation();
  const [selectedGender, setSelectedGender] = useState<GenderType>(null);

  return (
    <MyOnboardingLayout
      onNextPress={() => {
        if (selectedGender) {
          navigation.navigate("Birthday");
        }
      }}
    >
      <View className="flex w-full" style={{ gap: 40 }}>
        <MyText className="text-3xl font-semibold">{t("gender.title")}</MyText>

        <View className="w-full" style={{ gap: 16 }}>
          <GenderItem
            icon={GenderFemale}
            text={t("gender.female")}
            isSelected={selectedGender === "female"}
            onPress={() => setSelectedGender("female")}
          />
          <GenderItem
            icon={GenderMale}
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
