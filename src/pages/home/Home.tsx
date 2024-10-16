import assets from "@assets/index";
import StoryButton from "@components/buttons/StoryButton";
import StackCarousel from "@components/carousel/StackCarousel";
import LogoWithButtonHeader from "@components/headers/LogoWithButtonHeader";
import MyGradient from "@components/MyGradient";
import MyScreen from "@components/MyScreen";
import MyButton from "@components/natives/MyButton";
import MyImage from "@components/natives/MyImage";
import MyPressable from "@components/natives/MyPressable";
import MyText from "@components/natives/MyText";
import TodayCircle from "@components/TodayCircle";
import { useAuth } from "@context/Auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import resetTo from "@utils/resetTo";
import { Gradient } from "phosphor-react-native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, View } from "react-native";

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
        onPress={signOutWithThen}
        txt={t("actions.invitePeers")}
      />

      {state === "openCircle" && (
        <TodayCircle onOpenCircle={() => setState("newCircle")} />
      )}

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
              size="small"
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
