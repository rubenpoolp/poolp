import assets from "@assets/index";
import StoryButton from "@components/buttons/StoryButton";
import StackCarousel from "@components/carousel/StackCarousel";
import LogoWithButtonHeader from "@components/headers/LogoWithButtonHeader";
import MyGradient from "@components/MyGradient";
import MyScreen from "@components/MyScreen";
import MyButton from "@components/natives/MyButton";
import MyText from "@components/natives/MyText";
import { useAuth } from "@context/Auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import resetTo from "@utils/resetTo";
import { Gradient } from "phosphor-react-native";
import React from "react";
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
        onPress={signOutWithThen}
        txt={t("actions.invitePeers")}
      />

      <View className="flex-1 items-center">
        <MyText className="text-3xl font-bold text-center">
          {t("home.currentCircle")}
        </MyText>

        <StackCarousel data={data} />

        <StoryButton
          stories={[
            {
              firstName: "John",
              img: assets.test1,
            },
            {
              firstName: "Ruben",
              img: assets.test2,
            },
          ]}
        >
          <View className="px-6 py-2 rounded-xl border-2 border-gradient-primary-1">
            <MyGradient className="rounded-lg" />
            <MyText className="font-semibold text-md">
              {t("actions.openCircle")}
            </MyText>
          </View>
        </StoryButton>
      </View>

      {/* <View className="flex-row justify-between items-center w-full">
        <View className="self-start">
          <Picture />

          <MyButton
            onPress={signOutWithThen}
            txt={"Sign out"}
            className="mb-2"
          />
          <AppVersion />
        </View>
      </View> */}
    </MyScreen>
  );
};

export default Home;
