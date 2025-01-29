import { resetUnseenNotifs } from "@/api/account/resetUnseenNotifs.query";
import i18n from "@/utils/i18n";
import { useAuth } from "@context/Auth";
import { useMutation } from "@tanstack/react-query";
import { myCaptureException } from "@utils/sentry";

const useResetUnseenNotifs = () => {
  const auth = useAuth();

  return useMutation({
    mutationKey: ["resetUnseenNotifs"],
    mutationFn: async () => {
      if (!auth.user?.id) {
        throw new Error(i18n.t("errors.pleaseLogin"));
      }

      return resetUnseenNotifs(auth.user.id);
    },
    onError: (error: Error) => {
      myCaptureException(error);
      throw new Error(i18n.t("errors.updateFailed"), { cause: error });
    },
  });
};

export default useResetUnseenNotifs; 