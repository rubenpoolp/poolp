import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity, useWindowDimensions, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

import shadow from "@config/shadow";
import { shareToInviteFriends } from "@utils/share";
import { useTranslation } from "react-i18next";
import MyText from "./natives/MyText";

const WaitingCard = () => {
  const { width, height } = useWindowDimensions();
  const { t } = useTranslation();

  const cardWidth = width * 0.8;
  const cardHeight = height * 0.45;

  const onPress = () => {
    shareToInviteFriends("waitingRoom.inviteToCircle");
  };

  return (
    <Animated.View
      entering={FadeInDown.duration(100)}
      className="flex-1 items-center justify-center"
    >
      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        <View
          className="relative rounded-md border-4 border-purple-100 overflow-hidden z-10"
          style={{
            ...shadow.smallPurple,
            width: cardWidth,
            height: cardHeight,
          }}
        >
          <LinearGradient
            colors={["#F1C791", "#BBA9B5", "#8B5CF6"]}
            locations={[0, 0.5, 1]}
            start={{ x: 0.2, y: 0 }}
            end={{ x: 0.8, y: 1 }}
            className="absolute top-0 left-0 right-0 bottom-0"
          />
          <View className="flex-1 p-5 justify-center items-center">
            <MyText className="text-3xl font-bold text-center text-white">
              {t("waitingRoom.waitingForPeers")}
            </MyText>
          </View>
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.2)"]}
            className="absolute bottom-0 w-full h-1/3"
          />
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default WaitingCard;
