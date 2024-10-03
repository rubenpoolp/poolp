import { background, light } from "@config/colors";
import fonts from "@config/fonts";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import * as Sentry from "@sentry/react-native";
import LoaderModal from "@src/components/modals/LoaderModal";
import UpdateModal from "@src/components/modals/UpdateModal";
import { AuthProvider } from "@src/context/Auth";
import IsLoadingProvider from "@src/context/IsLoading";
import useNotifications from "@src/hooks/useNotifications";
import OnboardingNavigator from "@src/pages/navigation/OnboardingNavigator";
import i18n from "@src/utils/i18n";
import "@src/utils/sentry";
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
    </View>
  );
};

export default Sentry.wrap(App);
