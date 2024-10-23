import assets from "@assets/index";
import LogoWithButtonHeader from "@components/headers/LogoWithButtonHeader";
import MyScreen from "@components/MyScreen";
import MyButton from "@components/natives/MyButton";
import MyImage from "@components/natives/MyImage";
import MyText from "@components/natives/MyText";
import TodayCircle from "@components/TodayCircle";
import { useAuth } from "@context/Auth";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import CornerSparkles from "@components/CornerSparkles";

const Home = () => {
  const { t } = useTranslation();

  const [state, setState] = useState<"newCircle" | "openCircle">("newCircle");

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

          <View className="space-y-4 px-4">
            <CornerSparkles>
              <MyButton
                txt={t("home.makeStory")}
                txtClassName="font-bold text-lg"
                onPress={() => setState("openCircle")}
              />
            </CornerSparkles>

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
