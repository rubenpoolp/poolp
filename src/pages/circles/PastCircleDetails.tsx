import Avatar from "@components/Avatar";
import DotsThreeOnUser from "@components/buttons/DotsThreeOnUser";
import GradientLogoHeader from "@components/headers/GradientLogoHeader";
import MyScreen from "@components/MyScreen";
import MyText from "@components/natives/MyText";
import { PastCircle } from "@types/circles";
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
                <Avatar
                  size="lg"
                  username={participant.name}
                  picture={participant.avatar}
                />
                <MyText className="text-light font-semibold text-lg">
                  {participant.name}
                </MyText>
              </View>

              <DotsThreeOnUser
                userId={participant.id}
                canReportContent={false}
              />
            </View>
          ))}
        </View>
      </View>
    </MyScreen>
  );
};

export default PastCircleDetails;
