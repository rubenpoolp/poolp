import React, { useState } from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";
import MyText from "@src/components/natives/MyText";
import MyOnboardingLayout from "@src/pages/onboarding/MyOnboardingLayout";
import PhoneNumberInput from "@src/components/inputs/PhoneNumberInput";
import { CountryCode, parsePhoneNumber } from "libphonenumber-js";
import { useAuth } from "@src/context/Auth";
import { OnboardingNavigateTo } from "@src/pages/navigation/OnboardingNavigator";

const Phone = ({ navigation, route }: { navigation: any; route: any }) => {
  const { t } = useTranslation();
  const { sendSMS } = useAuth();

  const { user } = route.params;

  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [countryCode, setCountryCode] = useState<CountryCode>("FR");

  const handleNext = () => {
    // TODO: check if phone number is valid
    if (!phoneNumber) {
      return;
    }

    try {
      const parsedPhoneNumber = parsePhoneNumber(phoneNumber, countryCode);
      if (parsedPhoneNumber) {
        const formattedPhoneNumber = parsedPhoneNumber.format("E.164");

        sendSMS(formattedPhoneNumber)
          .then((data) => {
            console.log("data", data);
            OnboardingNavigateTo(navigation, "Phone", {
              user: { ...user, phoneNumber: formattedPhoneNumber },
            });
          })
          .catch((error) => {
            console.log("error", error);
          });
      } else {
        console.error("Invalid phone number");
      }
    } catch (error) {
      console.error("Error parsing phone number:", error);
    }
  };

  return (
    <MyOnboardingLayout onNextPress={handleNext}>
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
          onSubmitEditing={handleNext}
        />
      </View>
    </MyOnboardingLayout>
  );
};

export default Phone;
