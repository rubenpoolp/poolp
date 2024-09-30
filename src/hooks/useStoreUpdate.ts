import stores from "@config/stores";
import { captureException } from "@sentry/react-native";
import { supabase } from "@src/utils/supabase";
import { useEffect, useState } from "react";
import { Linking, Platform } from "react-native";
import appConfig from "../../app.config";
import useAppState from "./useAppState";

const isVersionLower = (version1: string, version2: string) => {
  let isLower = false;

  const currentVersionArray = version1.split(".");
  const remoteVersionArray = version2.split(".");
  for (let i = 0; i < currentVersionArray.length; i++) {
    if (parseInt(currentVersionArray[i]) < parseInt(remoteVersionArray[i])) {
      isLower = true;
      break;
    } else if (
      parseInt(currentVersionArray[i]) > parseInt(remoteVersionArray[i])
    ) {
      break;
    }
  }
  return isLower;
};

const useStoreUpdate = () => {
  const appState = useAppState();
  const [isUpdateAvailable, setIsUpdateAvailable] = useState(false);

  const queryGetLatestVersion = async () => {
    const currentVersion = appConfig.expo.version;

    const { data, error } = await supabase.from("settings").select("*");

    if (error) captureException(error);

    if (!currentVersion || !data || error || data.length === 0) return;

    if (isVersionLower(currentVersion, data[0].last_mandatory_version)) {
      setIsUpdateAvailable(true);
    }
  };

  useEffect(() => {
    const checkForUpdate = () => {
      if (__DEV__ || appState !== "active") return;
      queryGetLatestVersion();
    };
    if (appState === "inactive") setIsUpdateAvailable(false);

    checkForUpdate();
  }, [appState]);

  return {
    isStoreUpdateAvailable: isUpdateAvailable,
    handleStoreUpdatePress: () => {
      Linking.openURL(
        Platform.OS === "ios" ? stores.APP_STORE_URI : stores.PLAY_STORE_URI,
      );
    },
  };
};

export default useStoreUpdate;
