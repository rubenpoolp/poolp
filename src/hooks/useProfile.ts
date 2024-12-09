import useGetSchools from "@api/schools/getSchools.hook";
import { CONTACT_EMAIL } from "@config/config";
import { useAuth } from "@context/Auth";
import deleteAuthUser from "@queries/deleteAuthUser.query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import resetTo from "@utils/resetTo";
import { shareToInviteFriends } from "@utils/share";
import * as Linking from "expo-linking";
import { t } from "i18next";
import { FC } from "react";
import { Alert } from "react-native";

const useProfile = () => {
  const navigation = useNavigation();
  const { signOut } = useAuth();
  const { user } = useAuth();
  const { data: schools } = useGetSchools();
  const userSchool = schools?.find((school) => school.id === user?.school_id);

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
      value: userSchool?.name ?? "",
    },
    {
      name: "profile.invite",
      onPress: shareToInviteFriends,
    },
    {
      name: "profile.pushNotifications",
      onPress: () => Linking.openSettings(),
    },
    {
      name: "profile.help",
      onPress: () => {
        const email = CONTACT_EMAIL;
        return Linking.canOpenURL(`mailto:${email}`)
          .then((supported: boolean) => {
            if (supported) {
              Linking.openURL(`mailto:${email}`);
            } else {
              Alert.alert("Error", "Unable to open email");
            }
          })
          .catch((error: Error) => {
            console.error(error);
          });
      },
    },
    {
      name: "profile.rate",
      onPress: () =>
        process.env.APP_STORE_URI && Linking.openURL(process.env.APP_STORE_URI),
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
