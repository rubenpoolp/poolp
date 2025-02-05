import assets from "@assets/index";
import usePastCircles from "@hooks/usePastCircles";
import { setDateLastCircleReviewed } from "@utils/circles";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, View } from "react-native";
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
  const [hasTimedOut, setHasTimedOut] = useState(false);
  const lastPastCircle = pastCircles?.[0];
  const isLoading = !hasTimedOut && (!pastCircles || pastCircles.length === 0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasTimedOut(true);
    }, 5000); // 5 secondes de timeout

    return () => clearTimeout(timer);
  }, []);

  const handleReview = () => {
    setIsModalVisible(true);
  };

  if (isLoading) {
    return (
      <View className="flex-1 w-full justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!lastPastCircle || lastPastCircle.participants.length === 0) {
    setDateLastCircleReviewed();
    return null;
  }

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
