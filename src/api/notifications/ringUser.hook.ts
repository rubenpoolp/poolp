import { useMutation } from "@tanstack/react-query";
import { myCaptureException } from "@utils/sentry";

import { sendNotif } from "@api/notifications/sendNotif.query";
import i18n from "@utils/i18n";

const useRingUser = () => {
  return useMutation({
    mutationKey: ["ringUser"],
    mutationFn: async (userData: { userIds: string[] }) => {
      const { userIds } = userData;
      if (!userIds.length) {
        throw new Error("No users selected");
      }

      return sendNotif(userIds, i18n.t("notifications.ring.title"), i18n.t("notifications.ring.body"));
    },
    onError: (error: Error) => {
      myCaptureException(error);
      throw new Error("Error sending notification", { cause: error });
    },
    onSuccess: () => {
      // TODO: Add success message to user
    },
  });
};

export default useRingUser; 