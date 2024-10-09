import MyTextInput from "@components/inputs/MyTextInput";
import LogoWithText from "@components/LogoWithText";
import MyButton from "@components/natives/MyButton";
import MyText from "@components/natives/MyText";
import { useAuth } from "@context/Auth";
import MyOnboardingLayout from "@pages/onboarding/MyOnboardingLayout";
import resetTo from "@utils/resetTo";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

const Introduction = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const { t } = useTranslation();
  const [code, setCode] = useState("");
  const [phone, setPhone] = useState(
    process.env.EXPO_PUBLIC_TEST_PHONE_NUMBER ?? "",
  );
  const { sendSMS, checkCode, signOut } = useAuth();
  const hide = true;
  const { user, nextScreen } = route.params;

  const handleNext = () => {
    navigation.navigate(nextScreen, { user });
  };

  return (
    <MyOnboardingLayout
      onNextPress={handleNext}
      contentContainerStyle="pt-20"
      logo={false}
      canGoBack={false}
    >
      <LogoWithText />

      <View className="flex flex-col items-center space-y-4">
        <MyText className={"text-center"}>
          {t("introduction.description1")}
        </MyText>

        <MyText className={"text-center"}>
          {t("introduction.description2")}
        </MyText>

        <MyText className={"text-center"}>
          {t("introduction.description3")}
        </MyText>
        <MyText className={"text-center"}>
          {t("introduction.description4")}
        </MyText>
        <MyText className={"text-center"}>
          {t("introduction.description5")}
        </MyText>
      </View>
      <View className={`absolute right-0 top-1/2 w-full ${hide && "hidden"}`}>
        <MyTextInput
          className="w-full bg-light px-4 py-3 mt-2 mb-2 text-black"
          placeholder="Phone"
          value={phone}
          onChangeText={setPhone}
          onSubmitEditing={() => sendSMS(phone)}
        />
        <MyButton onPress={() => sendSMS(phone)} txt={`SEND SMS TO ${phone}`} />
        <MyTextInput
          className="w-full bg-light px-4 py-3 mt-2 mb-2 text-black"
          placeholder="Code"
          value={code}
          onChangeText={setCode}
          onSubmitEditing={() =>
            checkCode(phone, code).then(() => resetTo(navigation, "HomeStack"))
          }
        />
        <MyButton
          className="mb-2"
          onPress={() =>
            checkCode(phone, code).then(() => resetTo(navigation, "HomeStack"))
          }
          txt={"Check code"}
        />
        <MyButton onPress={() => signOut()} txt={"Sign out"} />
      </View>
    </MyOnboardingLayout>
  );
};

export default Introduction;
