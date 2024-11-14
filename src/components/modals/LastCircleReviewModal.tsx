import { PastCircle } from "@/types/circles";
import ReviewButton from "@components/buttons/ReviewButton";
import MyText from "@components/natives/MyText";
import { useState } from "react";
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
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const currentParticipant = pastCircle.participants[currentIndex];

  const handleLike = () => {
    console.log("like");

    if (currentIndex === pastCircle.participants.length - 1) {
      onClose();
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleNeutral = () => {
    console.log("neutral");

    if (currentIndex === pastCircle.participants.length - 1) {
      onClose();
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <MyModal isVisible={isVisible}>
      <View className="flex-1 bg-overlay w-full h-full">
        <SafeAreaProvider>
          <Image
            source={{ uri: currentParticipant.avatar }}
            className="flex-1 w-full bg-gray-600"
            resizeMode="cover"
          />

          <View className="absolute top-20 w-full justify-center">
            <MyText className="text-2xl font-semibold text-center">
              {t("review.title")}
            </MyText>
            <MyText className="text-2xl font-semibold text-center">
              Today's circle
            </MyText>
          </View>
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
                icon="💜"
              />
            </View>

            <MyText className="text-center text-gray-300 text-xs">
              {t("review.description")}
            </MyText>
          </View>
        </SafeAreaProvider>
      </View>
    </MyModal>
  );
};

export default LastCircleReviewModal;
