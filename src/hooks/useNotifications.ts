import useDecrementUnseenNotifs from "@api/account/decrementUnseenNotifs.hook";
import useResetUnseenNotifs from "@api/account/resetUnseenNotifs.hook";
import useUpdateAccount from "@api/account/updateAccount.hook";
import { useAuth } from "@context/Auth";
import { useNavigation } from "@react-navigation/native";
import { Account } from "@supabase_types";
import { UseMutationResult } from "@tanstack/react-query";
import i18n from "@utils/i18n";
import Constants from "expo-constants";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useEffect, useRef, useState } from "react";
import { Alert, AppState, Linking, Platform } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: true,
  }),
});

async function registerForPushNotificationsAsync() {
  if (!Device.isDevice) {
    // alert("Must use physical device for Push Notifications");
    return;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        i18n.t("alerts.notificationsNeeded.title"),
        i18n.t("alerts.notificationsNeeded.message"),
        [
          { text: i18n.t("actions.maybeLater"), style: "cancel" },
          {
            text: i18n.t("actions.sureThing"),
            onPress: () => Linking.openSettings(),
          },
        ],
      );
      return;
    }
  }

  const token = await Notifications.getExpoPushTokenAsync({
    projectId: Constants?.expoConfig?.extra?.eas.projectId,
  });

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}

async function pushTokenToUser(
  pushToken: string,
  updateAccount: UseMutationResult<
    any,
    Error,
    { data: Partial<Account> },
    unknown
  >,
  userPushToken: string | null,
) {
  // On enlève le ExponentPushToken[ et le ] à la fin pour n'avoir que le token et pas surcharger la DB pour rien
  const newPushToken = pushToken.replace("ExponentPushToken[", "").slice(0, -1);

  if (newPushToken === userPushToken) {
    return;
  }

  try {
    await updateAccount.mutateAsync({
      data: {
        push_token: newPushToken,
      },
    });
  } catch (error) {
    console.warn("pushTokenToUser", error);
  }
}

const useNotifications = () => {
  const navigation = useNavigation();
  const [notification, setNotification] = useState<
    Notifications.Notification | null
  >(null);
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  const [notificationEnabled, setNotificationEnabled] = useState(false);

  const auth = useAuth();
  const updateAccount = useUpdateAccount();
  const {mutate: decrementUnseenNotifs} = useDecrementUnseenNotifs();
  const resetUnseenNotifs = useResetUnseenNotifs();

  const initializeNotifications = async () => {
    const pushToken = await registerForPushNotificationsAsync();

    if (pushToken?.data && auth.user) {
      await pushTokenToUser(
        pushToken.data,
        updateAccount,
        auth.user.push_token,
      );
    }

    notificationListener.current = Notifications
      .addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    // Cleanup function
    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(
          notificationListener.current,
        );
      }
    };
  };

  useEffect(() => {
    const checkStatus = async () => {
      console.log("notificationEnabled", notificationEnabled);
      const { status: existingStatus } = await Notifications
        .getPermissionsAsync();

      if (existingStatus === "granted") {
        setNotificationEnabled(true);
      }
    };

    checkStatus();
  }, [notificationEnabled]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(
          notificationListener.current,
        );
      }
    };
  }, []);

  useEffect(() => {
    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        try {
          // On s'assure que la mutation est appelée correctement
          decrementUnseenNotifs();
          // On navigue vers la page appropriée
          if (response.notification.request.content.data?.url) {
            navigation.navigate(response.notification.request.content.data.url);
          }
        } catch (error) {
          console.error("Error handling notification response:", error);
        }
      }
    );

    return () => {
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, [navigation, decrementUnseenNotifs]);

  // Réinitialiser le compteur quand l'app passe au premier plan
  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState === 'active') {
        resetUnseenNotifs.mutate();
      }
    });

    return () => {
      subscription.remove();
    };
  }, [resetUnseenNotifs]);

  return { notification, initializeNotifications, notificationEnabled };
};

export default useNotifications;
