import { View } from "react-native";
import Hearts from "./animations/Hearts";
import MyButton from "./natives/MyButton";

const Paywall = ({
  isVisible,
  onClose,
}: {
  isVisible: boolean;
  onClose: () => void;
}) => {
  if (!isVisible) return null;

  return (
    <View className="absolute flex-1 w-full h-full px-4">
      <Hearts isVisible={isVisible} />
      <MyButton txt="Close" onPress={onClose} />
    </View>
  );
};

export default Paywall;
