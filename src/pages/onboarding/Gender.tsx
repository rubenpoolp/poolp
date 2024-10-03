import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import MyText from "@src/components/natives/MyText";
import MyOnboardingLayout from "@src/pages/onboarding/MyOnboardingLayout";
import { GenderFemale, GenderMale } from "phosphor-react-native";

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
    <TouchableOpacity
      onPress={onPress}
      className={`w-full flex-row items-center p-4 rounded-3xl ${
        isSelected ? "bg-gradient-primary-0" : "bg-gray-400"
      }`}
      style={{ gap: 12 }}
    >
      {icon &&
        React.createElement(icon, {
          size: 24,
          color: "white",
          weight: "bold",
        })}
      <MyText
        className={`text-lg font-semibold ${isSelected ? "text-white" : "text-light"}`}
      >
        {text}
      </MyText>
    </TouchableOpacity>
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
