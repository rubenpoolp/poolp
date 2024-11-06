import colors from "@config/colors";
import { useIsLoading } from "@context/IsLoading";
import { ActivityIndicator, View } from "react-native";
import MyModal from "./MyModal";

const LoaderModal = () => {
  const { isLoading } = useIsLoading();

  return (
    <MyModal
      animationIn="fadeIn"
      animationOut="fadeOut"
      isVisible={isLoading}
      backdropOpacity={0.5}
    >
      <View className="absolute bottom-14 bg-gradient-primary-0 shadow-sm p-2 rounded-full items-center flex-row right-4">
        <ActivityIndicator color={colors.light} />
      </View>
    </MyModal>
  );
};

export default LoaderModal;
