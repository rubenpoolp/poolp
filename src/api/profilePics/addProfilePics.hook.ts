import { useMutation, useQueryClient } from "@tanstack/react-query";
import i18n from "@utils/i18n";
import { myCaptureException } from "@utils/sentry";
import addProfilePic from "./addProfilePics.query";
import { useAuth } from "@context/Auth";

const useAddProfilePic = () => {
  const auth = useAuth();
  const userId = auth.user?.id;
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["addProfilePic", userId],
    mutationFn: ({ urls }: { urls: string[] }) => {
      if (!userId) throw new Error("User id is required to update profile pic");

      return addProfilePic(userId, urls);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profilePics", userId] });
    },
    onError: (error) => {
      myCaptureException(error);
      throw new Error(i18n.t("errors.didNotWorkPleaseRetry"), { cause: error });
    },
  });
};

export default useAddProfilePic;
