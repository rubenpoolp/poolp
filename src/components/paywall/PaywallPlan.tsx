import MyGradient from "@components/MyGradient";
import { gradient } from "@config/colors";
import shadow from "@config/shadow";
import { hapticImpact } from "@utils/haptics";
import { Pressable, View } from "react-native";
import MyText from "../natives/MyText";

interface PaywallPlanProps {
  isSelected: boolean;
  onSelect: () => void;
  price: string;
  period: string;
  isBestValue?: boolean;
}

const PaywallPlan = ({
  isSelected,
  onSelect,
  price,
  period,
  isBestValue,
}: PaywallPlanProps) => {
  return (
    <Pressable
      onPress={() => {
        hapticImpact("light");
        onSelect();
      }}
      className={`border rounded-xl p-4 mb-4 bg-background-dark ${
        isSelected ? "border-[#F4B63D]" : "border-light"
      }`}
      style={isSelected && shadow.gold}
    >
      <View className="flex-row justify-between items-center">
        <View>
          <View className="flex-row items-center">
            <MyText className="text-lg font-medium mr-2">{period}</MyText>
            {isBestValue && (
              <View className="rounded-full px-2 py-1">
                <MyGradient colors={gradient.gold} className="rounded-full" />
                <MyText className="text-black text-xs font-medium">
                  Best Value
                </MyText>
              </View>
            )}
          </View>
          <MyText className="">{price}</MyText>
        </View>
        <View
          className={`w-7 h-7 rounded-full items-center justify-center border-2 ${
            !isSelected ? "border-gradient-gold-1/60" : "border-0"
          }`}
        >
          {isSelected && (
            <>
              <MyGradient colors={gradient.gold} className="rounded-full" />
              <MyText className="text-black">✓</MyText>
            </>
          )}
        </View>
      </View>
    </Pressable>
  );
};

export default PaywallPlan;
