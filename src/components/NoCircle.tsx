import updateLastInteraction from "@api/account/updateLastInteraction.query";
import assets from "@assets/index";
import { useAuth } from "@context/Auth";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import CornerSparkles from "./CornerSparkles";
import MyButton from "./natives/MyButton";
import MyImage from "./natives/MyImage";
import MyText from "./natives/MyText";

const NoCircle = () => {
  const { t } = useTranslation();
  const auth = useAuth();

  const handlePress = () => {
    if (!auth.user?.id) return;
    updateLastInteraction(auth.user?.id);
  };

  return (
    <View className="flex-1 w-full space-y-10 justify-center">
      <MyImage img={assets.logoCropped} containerStyle="h-24" />

      <View className="items-center space-y-4">
        <MyText className="text-3xl font-semibold">
          {t("home.noCircle")}
        </MyText>

        <MyText className="text-center font-thin text-lg">
          {t("home.noCircleDescription")}
        </MyText>
      </View>

      <View className="space-y-4 px-4">
        <CornerSparkles>
          <MyButton
            txt={t("home.noCircleButton")}
            txtClassName="font-bold text-lg"
            onPress={handlePress}
          />
        </CornerSparkles>
      </View>
    </View>   
  );
};

export default NoCircle;