import useUpdateAccount from "@api/account/updateAccount.hook";
import { updateAccount } from "@api/account/updateAccount.query";
import { useAuth } from "@context/Auth";
import { User } from "@supabase/supabase-js";
import { Account } from "@supabase_types";
import { UseMutationResult } from "@tanstack/react-query";
import Constants from "expo-constants";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useEffect, useRef, useState } from "react";
import { Platform } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
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
      alert("Failed to get push token for push notification!");
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
  updateAccount: UseMutationResult<any, Error, { data: Partial<Account> }, unknown>,
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
  const [notification, setNotification] = useState(null);
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef();

  const auth = useAuth();
  const updateAccount = useUpdateAccount();


  useEffect(() => {
    (async () => {
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

      responseListener.current = Notifications
        .addNotificationResponseReceivedListener(() => {
        });

      return () => {
        Notifications.removeNotificationSubscription(
          notificationListener.current,
        );
        Notifications.removeNotificationSubscription(responseListener.current);
      };
    })();
  }, []);

  return { notification };
};

export default useNotifications;
