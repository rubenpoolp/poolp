import colors from "@config/colors";
import { useIsLoading } from "@context/IsLoading";
import { ActivityIndicator, Modal, View } from "react-native";

const LoaderModal = () => {
  const { isLoading } = useIsLoading();

  return (
    <Modal animationType="fade" transparent visible={isLoading}>
      <View className="flex-1 items-end justify-center bg-overlay">
        <View className="absolute bottom-14 bg-gradient-primary-0 shadow-sm p-2 rounded-full items-center flex-row right-4">
          <ActivityIndicator color={colors.light} />
        </View>
      </View>
    </Modal>
  );
};

export default LoaderModal;
