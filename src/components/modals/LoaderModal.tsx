import colors from "@config/colors";
import { useIsLoading } from "@context/IsLoading";
import { ActivityIndicator, Modal, View } from "react-native";
import MyText from "../natives/MyText";

const LoaderModal = () => {
  const { isLoading } = useIsLoading();

  return (
    <Modal animationType="fade" transparent visible={isLoading}>
      <View className="flex-1 items-center justify-center bg-overlay">
        <View className="absolute bottom-14 bg-white shadow-sm px-4 py-3 rounded-full items-center flex-row">
          <ActivityIndicator color={colors.dark} className="mr-2" />
          <MyText className="text-sm text-dark">Chargement</MyText>
        </View>
      </View>
    </Modal>
  );
};

export default LoaderModal;
