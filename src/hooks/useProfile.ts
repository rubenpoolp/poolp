import { useAuth } from "@context/Auth";
import deleteAuthUser from "@queries/deleteAuthUser.query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import resetTo from "@utils/resetTo";
import { t } from "i18next";
import { FC } from "react";
import { Alert, Linking, Share } from "react-native";

const useProfile = () => {
  const navigation = useNavigation();
  const { signOut } = useAuth();
  const { user } = useAuth();

  const signOutWithThen = () => {
    signOut().then(() => {
      AsyncStorage.clear();
      resetTo(navigation, "Loader");
    });
  };
  const list: {
    name: string;
    onPress?: () => void;
    icon?: FC;
    value?: string;
    txtClassName?: string;
  }[] = [
    {
      name: "profile.name",
      value: user?.name ?? "Lola",
    },
    {
      name: "profile.school",
      value: "Sebeweiss High School",
    },
    {
      name: "profile.invite",
      onPress: () =>
        Share.share({
          message: "https://www.google.com",
        }),
    },
    {
      name: "profile.pushNotifications",
      onPress: () => Linking.openSettings(),
    },
    {
      name: "profile.help",
      onPress: () => Linking.openURL("mailto:help@poolp.app"),
    },
    {
      name: "profile.rate",
      onPress: () => Linking.openURL("https://google.com"),
    },
    {
      name: "profile.aboutUs",
      onPress: () => Linking.openURL("https://poolp.app"),
    },
    {
      name: "profile.logout.title",
      onPress: () => {
        Alert.alert(
          "Do you really want to sign out?",
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
      },
    },
    {
      name: "profile.deletion.deleteAccount",
      txtClassName: "text-red",
      onPress: () => {
        Alert.alert(
          t("profile.deletion.deleteAccount"),
          t("profile.deletion.areYouSure"),
          [
            {
              text: t("actions.cancel"),
              style: "cancel",
            },
            {
              style: "destructive",
              text: t("actions.delete"),
              onPress: () => {
                deleteAuthUser()
                  .then(() => {
                    AsyncStorage.clear();
                    Alert.alert(
                      t("profile.deletion.accountDeleted"),
                      t("profile.deletion.accountDeletedDescription"),
                      [
                        {
                          text: "OK",
                          onPress: signOutWithThen,
                        },
                      ],
                    );
                  })
                  .catch((error) => {
                    Alert.alert("Erreur", error.message);
                  });
              },
            },
          ],
        );
      },
    },
  ];
  return list;
};

export default useProfile;
