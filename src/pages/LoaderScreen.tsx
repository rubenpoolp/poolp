import assets from "@assets/index";
import MyImage from "@components/natives/MyImage";
import { red } from "@config/colors";
import { useAuth } from "@context/Auth";
import useManageRoute from "@hooks/useManageRoute";
import { initializeRevenueCatApiKeys } from "@utils/purchase";
import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

const useInitialization = () => {
  // const { identify } = useAnalytics();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    // identify(user.id, user.email || "anonymous@user.com");
    initializeRevenueCatApiKeys(user.id);
  }, [user]);
};

const LoaderScreen = () => {
  useInitialization();
  useManageRoute();
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color={red} />
      </View>
    );
  }

  return (
    <View className="flex-1 justify-center items-center">
      <MyImage img={assets.splash} />
    </View>
  );
};

export default LoaderScreen;
