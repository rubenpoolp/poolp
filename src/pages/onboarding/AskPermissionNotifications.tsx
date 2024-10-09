import { Bump } from "@components/animations/Bump";
import MyPressable from "@components/natives/MyPressable";
import MyText from "@components/natives/MyText";
import MyOnboardingLayout from "@pages/onboarding/MyOnboardingLayout";
import { ArrowDown } from "phosphor-react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

const DisplayNiceNotification = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  const onPress = () => {};

  return (
    <Bump scaleValue={0.95}>
      <MyPressable
        onPress={onPress}
        className="flex space-y-1 mb-10 rounded-2xl border-2 border-gradient-primary-0 bg-gray-400 px-4 py-3 shadow-sm shadow-gradient-primary-0"
      >
        <MyText className="text-lg font-semibold">{title}</MyText>
        <MyText className="text-sm text-gray-100">{description}</MyText>
      </MyPressable>
    </Bump>
  );
};

const AskPermissionNotifications = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const { t } = useTranslation();
  const { user, nextScreen } = route.params;

  const handleNext = () => {
    navigation.navigate(nextScreen, { user });
  };

  const advantages = t("askPermissionNotifications.advantages", {
    returnObjects: true,
  }) as string[];

  return (
    <MyOnboardingLayout onNextPress={handleNext}>
      <MyText className="text-3xl font-semibold">
        {t("askPermissionNotifications.title")}
      </MyText>

      <View className="self-center">
        <ArrowDown size={140} />
      </View>
      <DisplayNiceNotification
        title={t("askPermissionNotifications.notifTitle")}
        description={t("askPermissionNotifications.notifDescription")}
      />

      <MyText className="text-sm text-gray-400 text-center mb-2">
        {t("askPermissionNotifications.byEnablingNotifications")}
      </MyText>

      <View className="flex flex-col self-center space-y-2">
        {advantages.map((advantage: string) => (
          <MyText key={advantage} className="text-sm text-gray-400">
            • {advantage}
          </MyText>
        ))}
      </View>
    </MyOnboardingLayout>
  );
};

export default AskPermissionNotifications;
