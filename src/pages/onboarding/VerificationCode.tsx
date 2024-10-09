import MyCodeInput from "@components/inputs/MyCodeInput";
import MyPressable from "@components/natives/MyPressable";
import MyText from "@components/natives/MyText";
import { MAX_LENGTH_CODE } from "@config/string";
import { useAuth } from "@context/Auth";
import { useIsLoading } from "@context/IsLoading";
import MyOnboardingLayout from "@pages/onboarding/MyOnboardingLayout";
import i18n from "@utils/i18n";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, View } from "react-native";

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

  const goNext = (codeFromInput: string) => {
    navigation.navigate(nextScreen, { ...user, code: codeFromInput });
  };

  const handleNext = (codeFromInput: string) => {
    setIsLoading(true);
    if (!codeFromInput || codeFromInput.length !== 6) {
      setIsLoading(false);
      Alert.alert(t("verificationCode.error"));
      return;
    }
    if (!user.phoneNumber)
      throw new Error("User phone number is required in Verification Code");

    checkCode(user.phoneNumber, codeFromInput)
      .then((data) => {
        console.log("data", data);
        goNext(codeFromInput);
      })
      .catch((error: Error) => {
        if (error.message.includes("Token has expired"))
          Alert.alert(i18n.t("verificationCode.invalidCode"));
        else Alert.alert(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleChangeCode = (codeFromInput: string) => {
    setCode(codeFromInput);
    if (codeFromInput.length === MAX_LENGTH_CODE) handleNext(codeFromInput);
  };

  return (
    <MyOnboardingLayout onNextPress={() => handleNext(code)}>
      <View className="flex w-full" style={{ gap: 80 }}>
        <MyText className="text-3xl font-semibold mb-5">
          {t("verificationCode.title")}
        </MyText>

        <MyCodeInput
          maxLength={MAX_LENGTH_CODE}
          value={code}
          onChangeText={handleChangeCode}
          onSubmitEditing={() => handleNext(code)}
        />
      </View>
      {__DEV__ && (
        <MyPressable
          className="absolute -top-20 right-4"
          onPress={() => goNext("123456")}
        >
          <MyText>DEV - Skip</MyText>
        </MyPressable>
      )}
    </MyOnboardingLayout>
  );
};

export default VerificationCode;
