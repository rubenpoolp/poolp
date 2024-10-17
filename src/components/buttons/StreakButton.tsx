import { Bump } from "@components/animations/Bump";
import MyGradient from "@components/MyGradient";
import MyPressable from "@components/natives/MyPressable";
import MyText from "@components/natives/MyText";
import shadow from "@config/shadow";
import { ArrowRight } from "phosphor-react-native";
import { View } from "react-native";

interface StreakButtonProps {
  onPress: () => void;
  disabled?: boolean;
}

const StreakButton = ({ onPress, disabled = false }: StreakButtonProps) => {
  return (
    <View className="items-center">
      <Bump disabled={disabled}>
        <MyPressable
          hapticImpactStyle="medium"
          onPress={onPress}
          className=""
          style={shadow.purple}
        >
          <View className="border border-orange rounded-full p-2 flex-row items-center justify-center py-0.5 px-2 shadow shadow-orange/40">
            <MyText className="text-sm">🔥</MyText>
            <MyText className="text-sm text-orange font-extrabold">12</MyText>
          </View>
        </MyPressable>
      </Bump>
    </View>
  );
};

export default StreakButton;
