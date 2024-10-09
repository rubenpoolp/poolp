import MyCodeInput from "@components/inputs/MyCodeInput";
import MyText from "@components/natives/MyText";
import { useAuth } from "@context/Auth";
import { useIsLoading } from "@context/IsLoading";
import MyOnboardingLayout from "@pages/onboarding/MyOnboardingLayout";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

const VerificationCode = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const { t } = useTranslation();
  const { checkCode } = useAuth();

  const [code, setCode] = useState<string>("");
  const { user, nextScreen } = route.params;
  const { setIsLoading } = useIsLoading();

  const handleNext = () => {
    setIsLoading(true);
    if (!code || code.length !== 6) {
      setIsLoading(false);
      return;
    }
    if (!user.phoneNumber)
      throw new Error("User phone number is required in Verification Code");
    checkCode(user.phoneNumber, code)
      .then((data) => {
        console.log("data", data);
        navigation.navigate(nextScreen, { ...user, code });
      })
      .catch((error) => {
        //TODO: handle error
        console.log("error", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <MyOnboardingLayout onNextPress={handleNext}>
      <View className="flex w-full" style={{ gap: 80 }}>
        <MyText className="text-3xl font-semibold mb-5">
          {t("verificationCode.title")}
        </MyText>

        <MyCodeInput
          value={code}
          onChangeText={setCode}
          onSubmitEditing={handleNext}
        />
      </View>
    </MyOnboardingLayout>
  );
};

export default VerificationCode;
