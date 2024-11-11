import Check from "@components/SVGs/Check";
import { View } from "react-native";
import MyText from "../natives/MyText";

const features = [
  "Discover who liked you",
  "Discover who wanted you to post",
  "Know before reviewing your connections",
  "No ads",
];

const PaywallFeatures = () => {
  return (
    <View className="space-y-4 mb-6">
      {features.map((feature, index) => (
        <View key={index} className="flex-row items-center">
          <View className="w-5 h-5 items-center justify-center mr-3">
            <Check />
          </View>
          <MyText className="font-bold">{feature}</MyText>
        </View>
      ))}
    </View>
  );
};

export default PaywallFeatures;
