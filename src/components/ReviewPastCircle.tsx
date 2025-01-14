import assets from "@assets/index";
import usePastCircles from "@hooks/usePastCircles";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import CornerSparkles from "./CornerSparkles";
import LastCircleReviewModal from "./modals/LastCircleReviewModal";
import MyButton from "./natives/MyButton";
import MyImage from "./natives/MyImage";
import MyText from "./natives/MyText";

interface ReviewPastCircleProps {
  onClose: () => void;
}

const ReviewPastCircle = ({ onClose }: ReviewPastCircleProps) => {
  const { t } = useTranslation();
  const { pastCircles } = usePastCircles();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const lastPastCircle = pastCircles?.[1];

  const handleReview = () => {
    setIsModalVisible(true);
  };

  if (!lastPastCircle) return null;

  return (
    <View className="flex-1 w-full space-y-10 justify-center">
      {!isModalVisible && (
        <View className="flex-1 w-full space-y-14 justify-center">
          <View className="space-y-6">
            <MyImage img={assets.logoCropped} containerStyle="h-24" />

            <View className="items-center space-y-4">
              <MyText className="text-3xl font-semibold">
                {t("home.newCircleAvailable")}
              </MyText>
            </View>
          </View>

          <View className="space-y-4 px-4">
            <CornerSparkles>
              <MyButton
                txt={t("home.reviewNow")}
                txtClassName="font-bold text-lg"
                onPress={handleReview}
              />
            </CornerSparkles>
          </View>
        </View>
      )}

      <LastCircleReviewModal
        isVisible={isModalVisible}
        pastCircle={lastPastCircle}
        onClose={() => {
          setIsModalVisible(false);
          setTimeout(() => {
            onClose();
          }, 500);
        }}
      />
    </View>
  );
};

export default ReviewPastCircle;
