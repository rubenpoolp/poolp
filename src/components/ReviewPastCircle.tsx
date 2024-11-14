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

  const [state, setState] = useState<"beforeReview" | "reviewing">(
    "beforeReview",
  );

  const lastPastCircle = pastCircles?.[0];

  const handleReview = () => {
    setState("reviewing");
  };

  if (!lastPastCircle) onClose();

  return (
    <View className="flex-1 w-full space-y-10 justify-center">
      {state === "beforeReview" && (
        <>
          <MyImage img={assets.logoCropped} containerStyle="h-24" />

          <View className="items-center space-y-4">
            <MyText className="text-3xl font-semibold">
              {t("home.newCircleAvailable")}
            </MyText>
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
        </>
      )}

      {state === "reviewing" && (
        <LastCircleReviewModal
          isVisible={state === "reviewing"}
          pastCircle={lastPastCircle}
          onClose={() => onClose()}
        />
      )}
    </View>
  );
};

export default ReviewPastCircle;
