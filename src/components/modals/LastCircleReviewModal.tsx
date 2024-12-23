import { PastCircle } from "@/types/circles";
import useLike from "@api/likes/like.hook";
import assets from "@assets/index";
import Hearts from "@components/animations/Hearts";
import ReviewButton from "@components/buttons/ReviewButton";
import MyText from "@components/natives/MyText";
import { useAuth } from "@context/Auth";
import sleep from "@utils/sleep";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Image, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import MyModal from "./MyModal";

interface LastCircleReviewModalProps {
  isVisible: boolean;
  pastCircle: PastCircle;
  onClose: () => void;
}

const LastCircleReviewModal = ({
  isVisible,
  pastCircle,
  onClose,
}: LastCircleReviewModalProps) => {
  const auth = useAuth();
  const like = useLike();

  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isLoadingPic, setIsLoadingPic] = useState<boolean>(false);
  const [heartsVisible, setHeartsVisible] = useState<boolean>(false);

  const [currentParticipant, setCurrentParticipant] = useState(
    pastCircle.participants[currentIndex],
  );

  useEffect(() => {
    if (currentIndex === pastCircle.participants.length - 1) {
      setCurrentParticipant(pastCircle.participants[currentIndex]);
    }
  }, [currentIndex]);

  const handleLike = async () => {
    if (!auth?.user?.id) {
      throw new Error("User not authenticated");
    }

    like.mutateAsync({
      circleId: pastCircle.id,
      userIdToLike: currentParticipant.id,
      userIdWhoLiked: auth?.user?.id,
    });

    setHeartsVisible(true);
    await sleep(2500);

    if (currentIndex === pastCircle.participants.length - 1) {
      onClose();
    } else {
      setCurrentIndex(currentIndex + 1);
    }
    setHeartsVisible(false);
  };

  const handleNeutral = () => {
    if (currentIndex === pastCircle.participants.length - 1) {
      onClose();
      return;
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  if (!currentParticipant) return null;

  return (
    <MyModal
      isVisible={isVisible}
      animationInTiming={400}
      animationOutTiming={400}
      animationIn={"slideInUp"}
      animationOut={"slideOutDown"}
    >
      <View className="flex-1 bg-overlay w-full h-full">
        <SafeAreaProvider>
          {currentParticipant.avatar && (
            <Image
              source={{ uri: currentParticipant.avatar }}
              onLoadStart={() => setIsLoadingPic(true)}
              onLoadEnd={() => setIsLoadingPic(false)}
              className="flex-1 w-full bg-gray-600"
              resizeMode="cover"
            />
          )}
          {(!currentParticipant.avatar || isLoadingPic) && (
            <View className="flex-1 w-full bg-gray-600" />
          )}
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.6)"]}
            className="absolute top-0 w-full h-1/3 rotate-180"
          />

          <View className="absolute top-20 w-full justify-center">
            <MyText className="text-2xl font-semibold text-center">
              {t("review.title")}
            </MyText>
            <MyText className="text-2xl font-semibold text-center">
              Today's circle
            </MyText>
          </View>

          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.6)"]}
            className="absolute bottom-0 w-full h-1/3"
          />
          <View className="absolute bottom-10 w-full px-10 space-y-6">
            <MyText className="text-3xl font-semibold">
              {currentParticipant.name}
            </MyText>

            <View className="flex-row justify-evenly w-full">
              <ReviewButton
                onPress={handleNeutral}
                label={t("review.neutral")}
                variant="neutral"
                icon="👋"
              />
              <ReviewButton
                onPress={handleLike}
                label={t("review.like")}
                variant="like"
                svgIcon={assets.heart}
              />
            </View>

            <MyText className="text-center text-gray-300 text-xs">
              {t("review.description")}
            </MyText>
          </View>
        </SafeAreaProvider>
      </View>
      <Hearts isVisible={heartsVisible} yOffset={100} />
    </MyModal>
  );
};

export default LastCircleReviewModal;
