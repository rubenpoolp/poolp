import { useMutation, useQueryClient } from "@tanstack/react-query";
import i18n from "@utils/i18n";
import { myCaptureException } from "@utils/sentry";
import { Alert } from "react-native";
import deleteCirclePic from "./deleteCirckePic.query";

const useDeleteCirclePic = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ circlePicId, circleId }: { circlePicId: string; circleId: string }) => {
      return deleteCirclePic(circleId, circlePicId);
    },
    onSuccess: (_, { circleId }) => {
      Alert.alert(
        i18n.t("alerts.deleteCirclePic.title"),
        i18n.t("alerts.deleteCirclePic.message")
      );
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

export default useDeleteCirclePic;