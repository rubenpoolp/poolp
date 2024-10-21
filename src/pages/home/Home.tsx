import assets from "@assets/index";
import LogoWithButtonHeader from "@components/headers/LogoWithButtonHeader";
import MyScreen from "@components/MyScreen";
import MyButton from "@components/natives/MyButton";
import MyImage from "@components/natives/MyImage";
import MyText from "@components/natives/MyText";
import TodayCircle from "@components/TodayCircle";
import { useAuth } from "@context/Auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import resetTo from "@utils/resetTo";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, View } from "react-native";

const data = [
  {
    id: "1",
    name: "John Doe",
    pictures: [assets.test1, assets.test2],
  },
  {
    id: "2",
    name: "Jane Smith",
    pictures: ["https://example.com/jane_1.jpg"],
  },
  {
    id: "3",
    name: "Alice Johnson",
    pictures: ["https://example.com/alice_1.jpg"],
  },
  {
    id: "4",
    name: "Bob Williams",
    pictures: ["https://example.com/bob_1.jpg"],
  },
  {
    id: "5",
    name: "Emma Brown",
    pictures: [
      "https://example.com/emma_1.jpg",
      "https://example.com/emma_2.jpg",
      "https://example.com/emma_3.jpg",
    ],
  },
];

const Home = () => {
  const navigation = useNavigation();
  const { signOut } = useAuth();
  const { t } = useTranslation();

  const [state, setState] = useState<"newCircle" | "openCircle">("newCircle");

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
    <MyScreen padding className="space-y-4">
      <LogoWithButtonHeader
        onPress={() => setState("newCircle")}
        txt={t("actions.invitePeers")}
        pastCircleButton
      />

      {state === "openCircle" && <TodayCircle />}

      {state === "newCircle" && (
        <View className="flex-1 w-full space-y-10 justify-center">
          <MyImage img={assets.logoCropped} containerStyle="h-24" />

          <View className="items-center space-y-4">
            <MyText className="text-3xl font-semibold">
              {t("home.newCircleAvailable")}
            </MyText>

            <MyText className="text-center font-thin text-lg">
              {t("home.newCircleAvailableDescription")}
            </MyText>
          </View>

          <View className="space-y-4">
            <MyButton
              txt={t("home.makeStory")}
              txtClassName="font-bold text-lg"
              onPress={() => setState("openCircle")}
            />
            <View className="items-center ">
              <MyText className="text-center text-sm text-gray-400 font-light">
                {t("home.makeStoryDescription")}
              </MyText>
              <MyText className="text-center text-sm text-gray-400 font-light">
                {t("home.youreFree")}
              </MyText>
            </View>
          </View>
        </View>
      )}
    </MyScreen>
  );
};

export default Home;
