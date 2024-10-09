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
import {
  ArrowRight,
  Envelope,
  Money,
  SignOut,
  Trash,
} from "phosphor-react-native";
import React from "react";
import { Alert, Linking, ScrollView, View } from "react-native";

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
    [key: string]: {
      name: string;
      onPress: () => void;
      icon?: React.FC;
    }[];
  } = {
    general: [
      // {
      //   name: "Informations personnelles",
      //   onPress: () => navigation.navigate("PersonalInformation"),
      //   icon: User,
      // },
      {
        name: "Contact",
        onPress: () => {
          Linking.openURL("mailto:aurelienvpro@gmail.com");
        },
        icon: Envelope,
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
        icon: SignOut,
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
        icon: Trash,
      },
    ],
    Légals: [
      {
        name: "Conditions Générales d’Utilisation",
        onPress: () => Linking.openURL(""),
      },
      {
        name: "Données personnelles",
        onPress: () => Linking.openURL(""),
      },
    ],
  };

  if (isAdmin) {
    list.general.push({
      name: "Abonnement",
      onPress: () => {
        navigation.navigate("Subscription");
      },
      icon: Money,
    });
  }

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
        {Object.keys(list).map((category) => (
          <View className="mb-4" key={category}>
            {category !== "general" && (
              <MyText className="text-xl mb-5">{category}</MyText>
            )}
            {list[category].map((item, index) => (
              <MyPressable
                key={index}
                onPress={item.onPress}
                className="shadow-md items-center justify-between flex-row px-5 py-3 w-full rounded-2xl mb-3"
              >
                <MyText
                  className={`${item.name === "Supprimer mon compte" ? "text-red-300" : ""}`}
                >
                  {item.name}
                </MyText>
                {item.icon ? <item.icon /> : <ArrowRight />}
              </MyPressable>
            ))}
          </View>
        ))}
      </ScrollView>
      <View className="px-4 self-start">
        <AppVersion />
      </View>
    </MyScreen>
  );
};

export default Profile;
