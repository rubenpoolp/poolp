import assets from "@assets/index";
import MyButton from "@components/natives/MyButton";
import MyImage from "@components/natives/MyImage";
import MyPressable from "@components/natives/MyPressable";
import MyText from "@components/natives/MyText";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

const WaitingRoom = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const { t } = useTranslation();
  const { user, nextScreen } = route.params;
  const [notificationEnabled, setNotificationEnabled] = useState(false);

  const handleNext = () => {
    navigation.navigate(nextScreen, { user });
  };

  const handleInvite = () => {
    console.log("Invite");
  };

  const handleEnableNotifications = () => {
    setNotificationEnabled(true);
  };

  return (
    <View className="flex-1 items-center justify-center px-5">
      <MyImage img={assets.logoCropped} containerStyle="h-24 mb-10" />
      <MyText className="text-center text-3xl font-medium mb-3">
        {t("waitingRoom.title")}
      </MyText>
      <MyText className="text-center text-lg mb-8">
        {t("waitingRoom.description")}
      </MyText>
      {!notificationEnabled && (
        <MyButton
          variant="pink"
          className="mb-20 w-4/5"
          txt={t("utils.enableNotifications")}
          onPress={handleEnableNotifications}
          size="large"
        />
      )}
      <MyButton
        txt={t("waitingRoom.inviteYourSchoolPeers")}
        onPress={handleInvite}
        size="large"
      />
      {__DEV__ && (
        <MyPressable className="absolute top-20 right-4" onPress={handleNext}>
          <MyText>DEV - Skip</MyText>
        </MyPressable>
      )}
    </View>
  );
};

export default WaitingRoom;
