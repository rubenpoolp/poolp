import GradientLogoHeader from "@components/headers/GradientLogoHeader";
import MyScreen from "@components/MyScreen";
import MyPressable from "@components/natives/MyPressable";
import MyText from "@components/natives/MyText";
import { PastCircle } from "@types/circles";
import { DotsThree } from "phosphor-react-native";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

interface PastCircleDetailsProps {
  route: any;
}

const PastCircleDetails = ({ route }: PastCircleDetailsProps) => {
  const { t } = useTranslation();

  const { circle } = route.params as { circle: PastCircle };

  return (
    <MyScreen padding>
      <GradientLogoHeader canGoBack />

      <View className="flex-1 items-center w-full">
        <View className="justify-between items-center space-y-6">
          <MyText className="text-3xl font-semibold">
            {t("pastCircle.title")}
          </MyText>
          <MyText className="text-3xl text-pink-200 font-semibold">
            {circle.formattedDate}
          </MyText>
        </View>

        <View className="flex-1 w-full space-y-12 items-center justify-center">
          {circle.participants.map((participant: any) => (
            <View
              className="flex-row justify-between items-center w-full px-4"
              key={participant.id}
            >
              <View className="flex-row items-center space-x-4">
                <View className="w-16 h-16 rounded-full bg-light" />
                <MyText className="text-light font-semibold text-lg">
                  {participant.name}
                </MyText>
              </View>

              <MyPressable hapticImpactStyle="medium" onPress={() => {}}>
                <DotsThree size={24} weight="bold" />
              </MyPressable>
            </View>
          ))}
        </View>
      </View>
    </MyScreen>
  );
};

export default PastCircleDetails;
