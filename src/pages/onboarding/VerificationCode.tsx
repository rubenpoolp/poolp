import React, { useState } from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";
import MyText from "@src/components/natives/MyText";
import MyOnboardingLayout from "@src/pages/onboarding/MyOnboardingLayout";
import NameInput from "@src/components/inputs/NameInput";
import MyCodeInput from "@src/components/inputs/MyCodeInput";
import { OnboardingNavigateTo } from "../navigation/OnboardingNavigator";
import { useAuth } from "@src/context/Auth";

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
  const { user } = route.params;

  const handleNext = () => {
    if (code && code.length === 6) {
      checkCode(user.phoneNumber, code).then((data) => {
        console.log("data", data);
        OnboardingNavigateTo(navigation, "VerificationCode", {
          user: { ...user, code },
        });
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
