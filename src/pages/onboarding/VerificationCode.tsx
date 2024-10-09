import MyCodeInput from "@components/inputs/MyCodeInput";
import MyText from "@components/natives/MyText";
import { useAuth } from "@context/Auth";
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

  const handleNext = () => {
    if (code && code.length === 6) {
      checkCode(user.phoneNumber, code).then((data) => {
        console.log("data", data);
        navigation.navigate(nextScreen, { ...user, code });
      });
    }
  };

  return (
    <MyOnboardingLayout
      onNextPress={() => {
        navigation.navigate("Share");
      }}
    >
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
