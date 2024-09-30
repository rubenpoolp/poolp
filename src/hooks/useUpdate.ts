import useExpoUpdate from "./useExpoUpdate";
import useStoreUpdate from "./useStoreUpdate";

const useUpdate = () => {
  const { isStoreUpdateAvailable, handleStoreUpdatePress } = useStoreUpdate();
  const { isExpoUpdateAvailable, isExpoDownloading, handleExpoUpdatePress } =
    useExpoUpdate();

  return {
    updateType: isExpoUpdateAvailable ? "expo" : "store",
    showModal: isExpoUpdateAvailable || isStoreUpdateAvailable,
    handleUpdatePress: isStoreUpdateAvailable
      ? handleStoreUpdatePress
      : handleExpoUpdatePress,
    isLoading: isExpoDownloading,
  };
};

export default useUpdate;
