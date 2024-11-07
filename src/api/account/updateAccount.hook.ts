import i18n from "@/utils/i18n";
import { useMutation } from "@tanstack/react-query";
import { updateAccount } from "@/api/account/updateAccount.query";
import { Account } from "@supabase_types";
import { myCaptureException } from "@utils/sentry";
import { useAuth } from "@context/Auth";

const useUpdateAccount = () => {
  const auth = useAuth();

  return useMutation({
    mutationKey: ["updateAccount"],
    mutationFn: async (userData: {data: Partial<Account>}) => {
      const { data } = userData;
      if (!auth.user?.id) {
        throw new Error(i18n.t("errors.pleaseLogin"));
      }

      return updateAccount(auth.user.id, data);
    },
    onError: (error: Error) => {
      myCaptureException(error);
      throw new Error(i18n.t("errors.updateFailed"), { cause: error });
    },
    onSuccess: () => {
      console.log(i18n.t("success.updateSuccessful"));
    },
  });
};

export default useUpdateAccount;
