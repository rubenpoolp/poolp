import Check from "@components/SVGs/Check";
import { t } from "i18next";
import { View } from "react-native";
import MyText from "../natives/MyText";

const features = [
  "discoverWhoLikedYou",
  "discoverWhoWantedYouToPost",
  "knowBeforeReviewingYourConnections",
  "noAds",
];

const PaywallFeatures = () => {
  return (
    <View className="space-y-4 mb-6">
      {features.map((feature, index) => (
        <View key={index} className="flex-row items-center">
          <View className="w-5 h-5 items-center justify-center mr-3">
            <Check />
          </View>
          <MyText className="font-bold">
            {t(`paywall.features.${feature}`)}
          </MyText>
        </View>
      ))}
    </View>
  );
};

export default PaywallFeatures;
