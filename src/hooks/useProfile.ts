import { useAuth } from "@context/Auth";
import deleteAuthUser from "@queries/deleteAuthUser.query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import resetTo from "@utils/resetTo";
import { t } from "i18next";
import { FC } from "react";
import { Alert, Linking } from "react-native";

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
    onPress: () => void;
    icon?: FC;
    value?: string;
    txtClassName?: string;
  }[] = [
    {
      name: "profile.name",
      onPress: () => {
        Linking.openURL("mailto:ruben@gmail.com"); // TODO: change to the right email
      },
      value: user?.name ?? "Lola",
    },
    {
      name: "profile.school",
      onPress: () => Linking.openURL("https://google.com"),
      value: "Sebeweiss High School",
    },
    {
      name: "profile.invite",
      onPress: () => Linking.openURL("https://google.com"),
    },
    {
      name: "profile.pushNotifications",
      onPress: () => Linking.openURL("https://google.com"),
    },
    {
      name: "profile.help",
      onPress: () => Linking.openURL("https://google.com"),
    },
    {
      name: "profile.rate",
      onPress: () => Linking.openURL("https://google.com"),
    },
    {
      name: "profile.aboutUs",
      onPress: () => Linking.openURL("https://google.com"),
    },

    {
      name: "profile.logout.title",
      onPress: () => {
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
