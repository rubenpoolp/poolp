import { Bump } from "@components/animations/Bump";
import MyPressable from "@components/natives/MyPressable";
import MyText from "@components/natives/MyText";
import shadow from "@config/shadow";
import { View } from "react-native";

interface ReviewButtonProps {
  onPress: () => void;
  label: string;
  icon: string;
  variant: "neutral" | "like";
}

const variantStyle = {
  neutral: {
    container: "border-gold-200",
    text: "text-gray-400",
    shadow: shadow.gold,
  },
  like: {
    container: "border-purple-100",
    text: "text-purple-100",
    shadow: shadow.purple,
  },
};

const ReviewButton = ({ onPress, label, icon, variant }: ReviewButtonProps) => {
  return (
    <View className="items-center space-y-2">
      <Bump>
        <MyPressable
          hapticImpactStyle="medium"
          onPress={onPress}
          className={`rounded-full w-20 aspect-square items-center justify-center border ${variantStyle[variant].container}`}
        >
          <MyText className={`text-3xl ${variantStyle[variant].text}`}>
            {icon}
          </MyText>
        </MyPressable>
      </Bump>
      <MyText className="text-gray-400 font-extrabold text-xs uppercase">
        {label}
      </MyText>
    </View>
  );
};

export default ReviewButton;
