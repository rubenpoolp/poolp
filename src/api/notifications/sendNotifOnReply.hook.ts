import i18n from "@utils/i18n";
  
import { useAuth } from "@context/Auth";
import { useMutation } from "@tanstack/react-query";
import { myCaptureException } from "@utils/sentry";
import { sendNotif } from "./sendNotif.query";

const useSendNotifOnReply = () => {
  const auth = useAuth();

  return useMutation({
    mutationKey: ["sendNotifOnReply"],
    mutationFn: async (userIds: string[]) => {
      if (!auth.user) { 
        throw new Error("User not found");
      }

      const userIdsWithoutCurrentUser = userIds.filter(id => id !== auth.user?.id);

      return sendNotif(userIdsWithoutCurrentUser, i18n.t("notifications.onReply.title"), i18n.t("notifications.onReply.body", { username: auth.user?.name }));
    },
    onError: (error: Error) => {
      myCaptureException(error);
      throw new Error("Error sending notification", { cause: error });
    },
    onSuccess: () => {
      // TODO: Add success message to user
      console.log("Notification to all users in circle sent");
    },
  });
};

export default useSendNotifOnReply;