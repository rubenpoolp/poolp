import { useAuth } from "@context/Auth";
import { useMutation } from "@tanstack/react-query";
import i18n from "@utils/i18n";
import { myCaptureException } from "@utils/sentry";
import { Alert } from "react-native";
import blockUser from "./blockUser.query";

const useBlockUser = () => {
  const auth = useAuth();

  return useMutation({
    mutationKey: ["blockUser"],
    mutationFn: async (toUserId: string) => {
      if (!auth.user?.id) {
        throw new Error(i18n.t("errors.pleaseLogin"));
      }
      return blockUser(auth.user.id, toUserId);
    },
    onError: (error: Error) => {
      myCaptureException(error);
      throw new Error("Error blocking user", { cause: error });
    },
    onSuccess: () => {
      Alert.alert(
        i18n.t('alerts.blockSuccess.title'),
        i18n.t('alerts.blockSuccess.message')
      );
    },
  });
};

export default useBlockUser;
