import { View } from "react-native";
import MyButton from "@src/components/natives/MyButton";
import { ArrowRight } from "phosphor-react-native";

interface NextButtonProps {
  onPress: () => void;
  disabled?: boolean;
  isLoading?: boolean;
}

const NextButton: React.FC<NextButtonProps> = ({
  onPress,
  disabled = false,
  isLoading = false,
}) => {
  return (
    <View className="items-center justify-center">
      <MyButton
        onPress={onPress}
        disabled={disabled}
        isLoading={isLoading}
        className="w-14 h-14 rounded-full p-2 bg-gradient-primary-0"
        leftIcon={<ArrowRight />}
      />
    </View>
  );
};

export default NextButton;
