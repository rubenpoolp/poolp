import i18n from "@utils/i18n";

import getLastInteractionFromCircleUsers from "@api/account/getLastInteractionFromCircleUsers.query";
import useGetMyDailyCircle from "@api/circles/getMyDailyCircle.hook";
import { useAuth } from "@context/Auth";
import { useMutation } from "@tanstack/react-query";
import { myCaptureException } from "@utils/sentry";
import { sendNotif } from "./sendNotif.query";

const useSendNotifOnReply = () => {
  const auth = useAuth();
  const { data: circle } = useGetMyDailyCircle();

  return useMutation({
    mutationKey: ["sendNotifOnReply"],
    mutationFn: async (userIds: string[]) => {
      if (!auth.user) {
        throw new Error("User not found");
      }
      if (!circle) {
        throw new Error("Circle not found");
      }

      const userIdsWithoutCurrentUser = userIds.filter((id) =>
        id !== auth.user?.id
      );

      const usersInCircle = await getLastInteractionFromCircleUsers(
        userIdsWithoutCurrentUser,
      );

      const usersActiveSinceCircleCreation = usersInCircle.filter((user) => {
        const lastInteraction = new Date(user.last_interaction_at);
        const circleCreatedAt = new Date(circle.created_at);

        return lastInteraction > circleCreatedAt;
      });

      if (usersActiveSinceCircleCreation.length === 0) {
        return;
      }

      return sendNotif(
        usersActiveSinceCircleCreation.map((user) => user.id),
        i18n.t("notifications.onReply.title"),
        i18n.t("notifications.onReply.body", { username: auth.user?.name }),
      );
    },
    onError: (error: Error) => {
      myCaptureException(error);
      throw new Error("Error sending notification", { cause: error });
    },
  });
};

export default useSendNotifOnReply;
