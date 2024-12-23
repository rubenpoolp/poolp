import assets from "@assets/index";
import { useAuth } from "@context/Auth";
import { shareToInviteFriends } from "@utils/share";
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
    shareToInviteFriends(); 
  };

  return (
    <View className="flex-1 w-full space-y-10 justify-center">
      <MyImage img={assets.logoCropped} containerStyle="h-24" />

      <View className="items-center space-y-4">
        <MyText className="text-3xl font-semibold">
          {t("waitingRoom.title")}
        </MyText>

        <MyText className="text-center font-thin text-lg">
          {t("waitingRoom.description")}
        </MyText>
      </View>

      <View className="space-y-4 px-4">
        <CornerSparkles>
          <MyButton
            txt={t("waitingRoom.inviteYourSchoolPeers")}
            txtClassName="font-bold text-lg"
            onPress={handlePress}
          />
        </CornerSparkles>
      </View>
    </View>   
  );
};

export default NoCircle;