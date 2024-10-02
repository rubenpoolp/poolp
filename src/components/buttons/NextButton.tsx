import { View } from "react-native";
import MyButton from "@src/components/natives/MyButton";

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
    <MyButton
      onPress={onPress}
      disabled={disabled}
      isLoading={isLoading}
      className="w-14 h-14 rounded-full p-2"
      rightIcon={
        <View className="flex-1 justify-center items-center">
          {/* <Ionicons name="arrow-forward" size={24} color="white" /> */}
        </View>
      }
    />
  );
};

export default NextButton;
