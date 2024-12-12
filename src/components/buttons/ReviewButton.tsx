import { Bump } from "@components/animations/Bump";
import MyImage from "@components/natives/MyImage";
import MyPressable from "@components/natives/MyPressable";
import MyText from "@components/natives/MyText";
import shadow from "@config/shadow";
import { View } from "react-native";
import { SvgProps } from "react-native-svg";

interface ReviewButtonProps {
  onPress: () => void;
  label: string;
  icon?: string;
  svgIcon?: SvgProps;
  variant: "neutral" | "like";
}

const variantStyle = {
  neutral: {
    container: "border-gold-200",
    text: "text-gold-200",
    shadow: shadow.gold,
  },
  like: {
    container: "border-purple-100",
    text: "text-purple-100",
    shadow: shadow.purple,
  },
};

const ReviewButton = ({ onPress, label, icon, svgIcon, variant }: ReviewButtonProps) => {
  return (
    <View className="items-center space-y-2">
      <Bump>
        <MyPressable
          hapticImpactStyle="medium"
          onPress={onPress}
          className={`rounded-full w-20 aspect-square items-center justify-center border ${variantStyle[variant].container}`}
        >
          {icon && (
            <MyText className={`text-3xl ${variantStyle[variant].text}`}>
              {icon}
            </MyText>
          )}
          {svgIcon && !icon && <MyImage img={svgIcon} containerStyle="w-16 h-16" />}
        </MyPressable>
      </Bump>
      <MyText className={`font-extrabold text-xs uppercase ${variantStyle[variant].text}`}>
        {label}
      </MyText>
    </View>
  );
};

export default ReviewButton;
