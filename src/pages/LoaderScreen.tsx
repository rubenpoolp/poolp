import assets from "@assets/index";
import { red } from "@config/colors";
import MyImage from "@src/components/natives/MyImage";
import { useAuth } from "@src/context/Auth";
import useManageRoute from "@src/hooks/useManageRoute";
import { initializeRevenueCatApiKeys } from "@src/utils/purchase";
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

const LoaderScreen: React.FC = () => {
  useInitialization();
  useManageRoute();
  const { loading } = useAuth();

  if (loading) {
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
