import { Bump } from "@components/animations/Bump";
import MyPressable from "@components/natives/MyPressable";
import MyText from "@components/natives/MyText";
import shadow from "@config/shadow";
import { View } from "react-native";

interface StreakButtonProps {
  nbStreak: number;
}

const StreakButton = ({ nbStreak }: StreakButtonProps) => (
  <View className="items-center">
    <Bump disabled>
      <MyPressable hapticImpactStyle="medium" disabledFull>
        <View
          className="bg-background-dark border border-orange rounded-full p-2 flex-row items-center justify-center py-0.5 px-2 space-x-1"
          style={shadow.orange}
        >
          <MyText className="text-sm">🔥</MyText>
          <MyText className="text-sm text-orange font-extrabold">
            {nbStreak}
          </MyText>
        </View>
      </MyPressable>
    </Bump>
  </View>
);

export default StreakButton;
