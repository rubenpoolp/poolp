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

const DisplayInfo = ({ title, value }: { title: string; value: string }) => {
  return (
    <View className="w-full flex-row justify-between items-center mb-2">
      <MyText className="text-lg font-semibold">{title}</MyText>
      <MyText className="text-lg">{value}</MyText>
    </View>
  );
};

const Profile = () => {
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
  }[] = [
    {
      name: "Contact",
      onPress: () => {
        Linking.openURL("mailto:ruben@gmail.com"); // TODO: change to the right email
      },
    },

    {
      name: "Conditions Générales d’Utilisation",
      onPress: () => Linking.openURL(""),
    },
    {
      name: "Données personnelles",
      onPress: () => Linking.openURL(""),
    },
    {
      name: "Se déconnecter",
      onPress: () => {
        Alert.alert("Déconnexion", "Es-tu sûr de vouloir te déconnecter ?", [
          {
            text: "Annuler",
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
      name: "Supprimer mon compte",
      onPress: () => {
        Alert.alert(
          "Supprimer mon compte",
          "Es-tu sûr de vouloir supprimer ton compte ?",
          [
            {
              text: "Annuler",
              style: "cancel",
            },
            {
              text: "Supprimer",
              onPress: () => {
                deleteAuthUser()
                  .then(() => {
                    AsyncStorage.clear();
                    Alert.alert(
                      "Compte supprimé",
                      "Ton compte a bien été supprimé.",
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
        <MyHeader title={"Profil"} canGoBack />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 20,
          paddingHorizontal: 16,
        }}
      >
        {list.map((item, index) => (
          <MyPressable // TODO change to DisplayInfo
            key={index}
            onPress={item.onPress}
            className="items-center justify-between flex-row w-full rounded-2xl mb-3"
          >
            <MyText
              className={`${item.name === "Supprimer mon compte" ? "text-red" : ""}`}
            >
              {item.name}
            </MyText>
            <MyText
              className={`${item.name === "Supprimer mon compte" ? "text-red-300" : ""}`}
            >
              {"Bouyachaka"}
            </MyText>
          </MyPressable>
        ))}
      </ScrollView>
      <View className="px-4 self-start">
        <AppVersion />
      </View>
    </MyScreen>
  );
};

export default Profile;
