import { decrementUnseenNotifs } from "@/api/account/decrementUnseenNotifs.query";
import i18n from "@/utils/i18n";
import { useAuth } from "@context/Auth";
import { useMutation } from "@tanstack/react-query";
import { myCaptureException } from "@utils/sentry";
import * as Notifications from "expo-notifications";

const useDecrementUnseenNotifs = () => {
  const auth = useAuth();

  return useMutation<any, Error, void>({
    mutationKey: ["decrementUnseenNotifs"],
    mutationFn: async () => {
      if (!auth.user?.id) {
        throw new Error(i18n.t("errors.pleaseLogin"));
      }

      return decrementUnseenNotifs(auth.user.id);
    },
    onSuccess: async (data) => {
      // Mettre à jour le badge avec la nouvelle valeur

      const newBadgeCount = data?.account?.unseen_notifs || 0;
      console.log("data", data);
      console.log("newBadgeCount", newBadgeCount);
      await Notifications.setBadgeCountAsync(newBadgeCount);
    },
    onError: (error: Error) => {
      myCaptureException(error);
      throw new Error(i18n.t("errors.updateFailed"), { cause: error });
    },
  });
};

export default useDecrementUnseenNotifs; 