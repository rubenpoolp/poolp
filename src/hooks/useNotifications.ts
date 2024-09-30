import { User } from "@supabase/supabase-js";
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
  token: string,
  user: User,
  setUser: any,
  setLoading: any,
) {
  // On enlève le ExponentPushToken[ et le ] à la fin pour n'avoir que le token et pas surcharger la DB pour rien
  const newPushToken = pushToken.replace("ExponentPushToken[", "").slice(0, -1);

  if (newPushToken !== user.pushToken && token) {
    try {
      const user = await QueryUserUpdate(token, {
        pushToken: newPushToken,
      });

      if (user) {
        setUser(user);
      }
    } catch (error) {
      console.warn("pushTokenToUser", error);
    } finally {
      setLoading(false);
    }
  }
}

const useNotifications = () => {
  const [notification, setNotification] = useState(null);
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef();

  useEffect(() => {
    (async () => {
      const pushToken = await registerForPushNotificationsAsync();

      if (pushToken?.data) {
        // await pushTokenToUser(
        //   pushToken.data,
        //   auth.authenticationToken,
        //   auth.user,
        //   (user: User) => setAuth({ ...auth, user }),
        //   (isLoading: boolean) => setUtils({ isLoading }),
        // );
      }

      notificationListener.current = Notifications
        .addNotificationReceivedListener((notification) => {
          setNotification(notification);
        });

      responseListener.current = Notifications
        .addNotificationResponseReceivedListener((response) => {
          console.log(response);
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
