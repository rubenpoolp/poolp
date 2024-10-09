import PhoneNumberInput from "@components/inputs/PhoneNumberInput";
import MyText from "@components/natives/MyText";
import { useAuth } from "@context/Auth";
import { useIsLoading } from "@context/IsLoading";
import MyOnboardingLayout from "@pages/onboarding/MyOnboardingLayout";
import { CountryCode, parsePhoneNumber } from "libphonenumber-js";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

const Phone = ({ navigation, route }: { navigation: any; route: any }) => {
  const { t } = useTranslation();
  const { sendSMS } = useAuth();
  const { user, nextScreen } = route.params;
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [countryCode, setCountryCode] = useState<CountryCode>("FR");
  const { setIsLoading } = useIsLoading();

  const handleNext = () => {
    setIsLoading(true);
    // TODO: check if phone number is valid
    if (!phoneNumber) {
      setIsLoading(false);
      return;
    }

    try {
      const parsedPhoneNumber = parsePhoneNumber(phoneNumber, countryCode);
      if (parsedPhoneNumber) {
        const formattedPhoneNumber = parsedPhoneNumber.format("E.164");

        sendSMS(formattedPhoneNumber)
          .then((data) => {
            console.log("data", data);
            navigation.navigate(nextScreen, {
              ...user,
              phoneNumber: formattedPhoneNumber,
            });
          })
          .catch((error) => {
            console.log("error", error);
          })
          .finally(() => {
            setIsLoading(false);
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
