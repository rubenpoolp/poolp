import { useMutation, useQueryClient } from "@tanstack/react-query";
import i18n from "@utils/i18n";
import { myCaptureException } from "@utils/sentry";
import deleteCirclePic from "./deleteCirckePic.query";

const useDeleteCirclePic = (circleId?: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ circlePicId, circleId }: { circlePicId: string; circleId: string }) => {
      console.log("test 1212");
      return deleteCirclePic(circleId, circlePicId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getCirclePics", circleId],
      });
      console.log("deleted circle pic");
    },
    onError: (error) => {
      myCaptureException(error);
      throw new Error(i18n.t("errors.didNotWorkPleaseRetry"), { cause: error });
    },
  });
};

export default useDeleteCirclePic;