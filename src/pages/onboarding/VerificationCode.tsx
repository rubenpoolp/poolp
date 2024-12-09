import MyCodeInput from "@components/inputs/MyCodeInput";
import MyText from "@components/natives/MyText";
import { MAX_LENGTH_CODE } from "@config/string";
import { useAuth } from "@context/Auth";
import { useIsLoading } from "@context/IsLoading";
import MyOnboardingLayout from "@pages/onboarding/MyOnboardingLayout";
import i18n from "@utils/i18n";
import sleep from "@utils/sleep";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Keyboard, TextInput, View } from "react-native";

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
  const codeInputRef = useRef<TextInput>(null);
  const { user, nextScreen } = route.params;
  const { setIsLoading } = useIsLoading();

  useEffect(() => {
    sleep(700).then(() => {
      codeInputRef.current?.focus();
    });
  }, []);

  const goNext = () => {
    navigation.navigate(nextScreen, { user }); // We do not need the confirmation code
  };

  const handleNext = (codeFromInput: string) => {
    Keyboard.dismiss();
    setIsLoading(true);
    if (!codeFromInput || codeFromInput.length !== 6) {
      setIsLoading(false);
      Alert.alert(t("onboarding.verificationCode.error"));
      return;
    }
    if (!user.phone)
      throw new Error("User phone number is required in Verification Code");

    checkCode(user.phone, codeFromInput)
      .then((data) => {
        if (data.error) {
          throw data.error;
        }
        if (data.hasAccount) navigation.navigate("Loader");
        else goNext(codeFromInput);
      })
      .catch((error: Error) => {
        if (error.message.includes("Token has expired"))
          Alert.alert(i18n.t("onboarding.verificationCode.invalidCode"));
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
  console.log("Reload component VerificationCode");

  return (
    <MyOnboardingLayout onNextPress={() => handleNext(code)}>
      <View className="flex w-full" style={{ gap: 80 }}>
        <MyText className="text-3xl font-semibold mb-5">
          {t("onboarding.verificationCode.title")}
        </MyText>

        <MyCodeInput
          ref={codeInputRef}
          maxLength={MAX_LENGTH_CODE}
          value={code}
          onChangeText={handleChangeCode}
          onSubmitEditing={() => handleNext(code)}
          autoFocus={false}
        />
      </View>
    </MyOnboardingLayout>
  );
};

export default VerificationCode;
