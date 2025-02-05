import assets from "@assets/index";
import MyImage from "@components/natives/MyImage";
import { useAuth } from "@context/Auth";
import useAnalytics from "@hooks/useAnalytics";
import useManageRoute from "@hooks/useManageRoute";
import { setAsyncStorage } from "@utils/asyncStorage";
import { initializeRevenueCatApiKeys } from "@utils/purchase";
import { supabase } from "@utils/supabase";
import React, { useEffect } from "react";
import { View } from "react-native";

const useInitialization = () => {
  const { identify } = useAnalytics();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    identify(user.id, user.phone || "anonymous");

    const storageUrl = supabase.storage
      .from("")
      .getPublicUrl("")
      .data.publicUrl.slice(0, -1); // remove last /
    setAsyncStorage("STORAGE_URL", storageUrl);

    initializeRevenueCatApiKeys(user.id);
  }, [user]); // Do not use identify here otherwise initializeRevenueCatApiKeys will be called twice and creates a loop on LoadingScreen (Purchases.login is stuck)
};

const LoaderScreen = () => {
  useInitialization();
  useManageRoute();

  return (
    <View className="flex-1 justify-center items-center">
      <MyImage img={assets.splash} />
    </View>
  );
};

export default LoaderScreen;
