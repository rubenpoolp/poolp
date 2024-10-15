import AppVersion from "@components/AppVersion";
import LogoWithButtonHeader from "@components/headers/LogoWithButtonHeader";
import MyScreen from "@components/MyScreen";
import MyButton from "@components/natives/MyButton";
import { useAuth } from "@context/Auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import resetTo from "@utils/resetTo";
import React from "react";
import { useTranslation } from "react-i18next";
import { Alert, View } from "react-native";

const Home = () => {
  const navigation = useNavigation();
  const { signOut } = useAuth();
  const { t } = useTranslation();

  const signOutWithThen = () => {
    Alert.alert(
      "Are you sure you want to sign out?",
      "",
      [
        {
          text: "Cancel",
        },
        {
          style: "destructive",
          text: "Sign out",
          onPress: () => {
            signOut().then(() => {
              AsyncStorage.clear();
              resetTo(navigation, "Loader");
            });
          },
        },
      ],
      { cancelable: false },
    );
  };

  return (
    <MyScreen className="px-4">
      <LogoWithButtonHeader
        onPress={() => {
          console.log("invitePeers");
        }}
        txt={t("actions.invitePeers")}
      />

      <View className="flex-row justify-between items-center w-full">
        <View className="self-start">
          {/* <Picture /> */}

          <MyButton
            onPress={signOutWithThen}
            txt={"Sign out"}
            className="mb-2"
          />
          <AppVersion />
        </View>
      </View>
    </MyScreen>
  );
};

export default Home;
