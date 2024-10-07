import React, { useState } from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";
import MyText from "@src/components/natives/MyText";
import MyOnboardingLayout from "@src/pages/onboarding/MyOnboardingLayout";
import PhoneNumberInput from "@src/components/inputs/PhoneNumberInput";
import { CountryCode } from "libphonenumber-js";

const Phone = ({ navigation }: { navigation: any }) => {
  const { t } = useTranslation();

  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [countryCode, setCountryCode] = useState<CountryCode>("FR");

  return (
    <MyOnboardingLayout
      onNextPress={() => {
        navigation.navigate("VerificationCode");
      }}
    >
      <View className="flex w-full" style={{ gap: 80 }}>
        <View className="items-start space-y-2">
          <MyText className="text-3xl font-semibold">{t("phone.title")}</MyText>
          <MyText className="text-gray-500 text-xs">
            {t("phone.subtitle")}
          </MyText>
        </View>
        <PhoneNumberInput
          value={phoneNumber}
          setValue={setPhoneNumber}
          countryCode={countryCode}
          setCountryCode={setCountryCode}
          resetError={() => {}}
        />
      </View>
    </MyOnboardingLayout>
  );
};

export default Phone;
