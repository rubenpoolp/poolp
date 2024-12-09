import { useMutation } from "@tanstack/react-query";
import { myCaptureException } from "@utils/sentry";

import getMyDailyCircleQuery from "@api/circles/getMyDailyCircle.query";
import { ringUser } from "@api/notifications/ringUser.query";
import { sendNotif } from "@api/notifications/sendNotif.query";
import { useAuth } from "@context/Auth";
import i18n from "@utils/i18n";
import { Alert } from "react-native";

const useRingUser = () => {
  const auth = useAuth();

  return useMutation({
    mutationKey: ["ringUser"],
    mutationFn: async ({ userId }: { userId: string }) => {
      if (!userId) {
        throw new Error("No users selected");
      }
      const circle = await getMyDailyCircleQuery(auth.user?.id!);
      if (!circle) {
        throw new Error("No circle found");
      }

      const success = await ringUser(circle.id, auth.user?.id!, userId);

      if (!success) {
        throw new Error("User already rung");
      }
      return sendNotif(
        [userId],
        i18n.t("notifications.ring.title"),
        i18n.t("notifications.ring.body"),
      );
    },
    onError: (error: Error) => {
      if (error.message === "User already rung") {
        Alert.alert(
          i18n.t("notifications.ringExcessive.title"),
          i18n.t("notifications.ringExcessive.body"),
        );
        return;
      }

      myCaptureException(error);
      throw new Error("Error sending notification", { cause: error });
    },
    onSuccess: () => {
      // TODO: Add success message to user
      // Alert.alert('Success', 'You have successfully sent a notification to the user');
    },
  });
};

export default useRingUser;
