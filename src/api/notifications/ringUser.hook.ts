import { useMutation } from "@tanstack/react-query";
import { myCaptureException } from "@utils/sentry";

import getMyDailyCircleQuery from "@api/circles/getMyDailyCircle.query";
import { useAuth } from "@context/Auth";
import i18n from "@utils/i18n";
import { ringUser } from "./ringUser.query";
import { sendNotif } from "./sendNotif.query";

const useRingUser = () => {

  const auth = useAuth();

  return useMutation({
    mutationKey: ["ringUser"],
    mutationFn: async ({userId}: {userId: string}) => {
      if (!userId) {
        throw new Error("No users selected");
      }
      const circle = await getMyDailyCircleQuery(auth.user?.id!);
      if (!circle) {
        throw new Error("No circle found");
      }

      ringUser(circle.id, auth.user?.id!, userId);
      return sendNotif([userId], i18n.t("notifications.ring.title"), i18n.t("notifications.ring.body"));
    },
    onError: (error: Error) => {
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