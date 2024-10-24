import { Bump } from "@components/animations/Bump";
import MyPressable from "@components/natives/MyPressable";
import MyText from "@components/natives/MyText";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

interface SkipButtonProps {
  onPress: () => void;
}

const SkipButton = ({ onPress }: SkipButtonProps) => {
  const { t } = useTranslation();

  return (
    <View className="items-center">
      <Bump>
        <MyPressable
          hapticImpactStyle="medium"
          onPress={onPress}
          className="items-center justify-center bg-transparent"
        >
          <MyText className="text-gray-500">{t("actions.skip")}</MyText>
        </MyPressable>
      </Bump>
    </View>
  );
};

export default SkipButton;
