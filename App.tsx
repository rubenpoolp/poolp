import LoaderModal from "@components/modals/LoaderModal";
import UpdateModal from "@components/modals/UpdateModal";
import { background, light } from "@config/colors";
import fonts from "@config/fonts";
import { AuthProvider } from "@context/Auth";
import IsLoadingProvider from "@context/IsLoading";
import useNotifications from "@hooks/useNotifications";
import OnboardingNavigator from "@pages/navigation/OnboardingNavigator";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import * as Sentry from "@sentry/react-native";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import i18n from "@utils/i18n";
import "@utils/sentry";
import { supabase } from "@utils/supabase";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { IconContext } from "phosphor-react-native";
import React, { useCallback, useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

const myTheme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    background: background.dark,
  },
};

const queryClient = new QueryClient();

const App = () => {
  const [fontLoaded] = useFonts(fonts);
  const [appIsReady, setAppIsReady] = useState(false);
  useNotifications();

  useEffect(() => {
    async function prepare() {
      try {
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) await SplashScreen.hideAsync();
  }, [appIsReady]);

  useEffect(() => {
    if (appIsReady) SplashScreen.hideAsync();
  }, [appIsReady]);

  if (!fontLoaded || !appIsReady) return null;

  return (
    <View className="flex-1" onLayout={onLayoutRootView}>
      <SessionContextProvider supabaseClient={supabase}>
        <QueryClientProvider client={queryClient}>
          <I18nextProvider i18n={i18n}>
            <StatusBar style="light" />
            <SafeAreaProvider>
              <IsLoadingProvider>
                <IconContext.Provider
                  value={{
                    color: light,
                    size: 24,
                    weight: "regular",
                  }}
                >
                  <AuthProvider>
                    <NavigationContainer theme={myTheme}>
                      {/* <MyPostHogProvider> */}
                      <OnboardingNavigator />
                      <UpdateModal />
                      {/* </MyPostHogProvider> */}
                    </NavigationContainer>
                  </AuthProvider>
                  <LoaderModal />
                </IconContext.Provider>
              </IsLoadingProvider>
            </SafeAreaProvider>
          </I18nextProvider>
        </QueryClientProvider>
      </SessionContextProvider>
    </View>
  );
};

export default Sentry.wrap(App);
