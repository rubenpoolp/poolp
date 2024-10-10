import AppVersion from "@components/AppVersion";
import MyHeader from "@components/MyHeader";
import MyScreen from "@components/MyScreen";
import MyPressable from "@components/natives/MyPressable";
import MyText from "@components/natives/MyText";
import { useAuth } from "@context/Auth";
import deleteAuthUser from "@queries/deleteAuthUser.query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import resetTo from "@utils/resetTo";
import React, { FC } from "react";
import { Alert, Linking, ScrollView, View } from "react-native";
import { useTranslation } from "react-i18next";
import MyButton from "@components/natives/MyButton";
import { Bump } from "@components/animations/Bump";

const DisplayInfo = ({
  title,
  value,
  txtClassName,
}: {
  title: string;
  value: string;
  txtClassName?: string;
}) => {
  const { t } = useTranslation();

  return (
    <View className="w-full flex-row justify-between items-center mb-6">
      <MyText className={`text-lg font-semibold ${txtClassName}`}>
        {t(title)}
      </MyText>
      <MyText className="text-gray-500 font-semibold">{value}</MyText>
    </View>
  );
};

const Profile = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { isAdmin, signOut } = useAuth();

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
      value: "Lola",
    },

    {
      name: "profile.school",
      onPress: () => Linking.openURL(""),
      value: "Sebeweiss High School",
    },
    {
      name: "profile.invite",
      onPress: () => Linking.openURL(""),
    },
    {
      name: "profile.pushNotifications",
      onPress: () => Linking.openURL(""),
    },
    {
      name: "profile.help",
      onPress: () => Linking.openURL(""),
    },
    {
      name: "profile.rate",
      onPress: () => Linking.openURL(""),
    },
    {
      name: "profile.aboutUs",
      onPress: () => Linking.openURL(""),
    },

    {
      name: "profile.logout.title",
      onPress: () => {
        Alert.alert(t("profile.logout.title"), t("profile.logout.areYouSure"), [
          {
            text: t("actions.cancel"),
            style: "cancel",
          },
          {
            text: "Se déconnecter",
            onPress: signOutWithThen,
          },
        ]);
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

  return (
    <MyScreen className="px-0">
      <View className="px-4">
        <MyHeader canGoBack />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 0,
          paddingHorizontal: 32,
        }}
      >
        <View className="flex space-y-4">
          <View className="relative flex items-center justify-center">
            <View className="w-24 h-24 bg-pink-100 rounded-full overflow-hidden flex justify-center items-center">
              <MyText className="text-5xl text-background-dark">L</MyText>
            </View>

            <View className="-translate-y-4">
              <Bump scaleValue={0.95}>
                <MyButton
                  onPress={() => {}}
                  txt="Add pictures"
                  size="small"
                  txtClassName="font-semibold"
                />
              </Bump>
            </View>

            <View className="flex items-center justify-center">
              <Bump scaleValue={0.95}>
                <MyButton
                  onPress={() => {}}
                  txt={t("profile.seeWhoLikedYou")}
                  size="small"
                  txtClassName="font-semibold text-gray-500"
                  variant="pink"
                  className="mb-2"
                />
              </Bump>
              <MyText className="text-gray-400 font-thin">
                Available in 7 circles
              </MyText>
            </View>
          </View>

          <View>
            {list.map((item, index) => (
              <DisplayInfo
                key={index}
                title={item.name}
                value={item.value ?? ""}
                txtClassName={item.txtClassName ?? ""}
              />
            ))}
          </View>
        </View>
      </ScrollView>
      <View className="px-4 self-start">
        <AppVersion />
      </View>
    </MyScreen>
  );
};

export default Profile;
