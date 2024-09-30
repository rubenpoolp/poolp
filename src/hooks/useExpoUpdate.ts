import {
  checkForUpdateAsync,
  fetchUpdateAsync,
  reloadAsync,
  useUpdates,
} from "expo-updates";
import { useEffect, useState } from "react";
import useAppState from "./useAppState";

const useExpoUpdate = () => {
  const {
    isUpdateAvailable: isUpdateAvailableHook,
    isUpdatePending,
    isDownloading,
  } = useUpdates();
  const appState = useAppState();
  const [isUpdateAvailable, setIsUpdateAvailable] = useState(
    isUpdateAvailableHook,
  );

  useEffect(() => {
    if (isUpdatePending) {
      // Update has successfully downloaded; apply it now
      reloadAsync();
    }
  }, [isUpdatePending]);

  useEffect(() => {
    const checkForUpdate = () => {
      if (__DEV__ || appState !== "active") return;

      checkForUpdateAsync().then((update) => {
        setIsUpdateAvailable(update.isAvailable);
      });
    };
    if (appState === "inactive") setIsUpdateAvailable(false);

    checkForUpdate();
  }, [appState]);

  return {
    isExpoUpdateAvailable: isUpdateAvailable,
    isExpoDownloading: isDownloading,
    handleExpoUpdatePress: fetchUpdateAsync,
  };
};

export default useExpoUpdate;
