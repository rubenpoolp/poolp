import { updateAccount } from "@/api/account/updateAccount.query";
import i18n from "@/utils/i18n";
import { useAuth } from "@context/Auth";
import { Account } from "@supabase_types";
import { useMutation } from "@tanstack/react-query";
import { myCaptureException } from "@utils/sentry";

const useUpdateAccount = () => {
  const auth = useAuth();

  return useMutation({
    mutationKey: ["updateAccount"],
    mutationFn: async (userData: { data: Partial<Account> }) => {
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
    onSuccess: () => {},
  });
};

export default useUpdateAccount;
