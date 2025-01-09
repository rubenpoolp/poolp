import updateLastInteraction from "@api/account/updateLastInteraction.query";
import { useAuth } from "@context/Auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setDateLastTimeWentOnCircle } from "@utils/circles";
import i18n from "@utils/i18n";
import { myCaptureException } from "@utils/sentry";
import addCirclePic from "./addCirclePic.query";

const useAddCirclePic = (circleId?: string) => {
  const auth = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["addCirclePic", auth.user?.id],
    mutationFn: async ({ url }: { url: string }) => {
      if (!circleId) {
        throw new Error("Circle id is required to update circle pic");
      }

      if (!auth.user?.id) {
        throw new Error("User id is required to update circle pic");
      }

      updateLastInteraction(auth.user.id);
      await setDateLastTimeWentOnCircle();
      return addCirclePic(circleId, auth.user.id, url);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getCirclePics", circleId],
      });
    },
    onError: (error) => {
      myCaptureException(error);
      throw new Error(i18n.t("errors.didNotWorkPleaseRetry"), { cause: error });
    },
  });
};

export default useAddCirclePic;
