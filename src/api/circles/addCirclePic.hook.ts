import { useAuth } from "@context/Auth";
import { useMutation } from "@tanstack/react-query";
import i18n from "@utils/i18n";
import { myCaptureException } from "@utils/sentry";
import addCirclePic from "./addCirclePic.query";

const useAddCirclePic = () => {
  const auth = useAuth();

  return useMutation({
    mutationKey: ["addCirclePic", auth.user?.id],
    mutationFn: ({ circleId, url }: { circleId: string; url: string }) => {
      if (!auth.user?.id) {
        throw new Error("User id is required to update circle pic");
      }

      return addCirclePic(circleId, auth.user.id, url);
    },
    onSuccess: () => {
      // queryClient.invalidateQueries({
      //   queryKey: ["circlePics", auth.user?.id],
      // });
    },
    onError: (error) => {
      myCaptureException(error);
      throw new Error(i18n.t("errors.didNotWorkPleaseRetry"), { cause: error });
    },
  });
};

export default useAddCirclePic;
