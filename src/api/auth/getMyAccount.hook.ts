import i18n from "@/utils/i18n";
import { useQuery } from "@tanstack/react-query";
import getMyAccount from "./getMyAccount.query";

const useGetMyAccount = (user_id: string | undefined) => {
  return useQuery({
    queryKey: ["account", user_id],
    queryFn: () => {
      if (user_id === undefined) throw new Error(i18n.t("errors.pleaseLogin"));

      return getMyAccount(user_id);
    },
    enabled: !!user_id,
    initialData: undefined,
  });
};

export default useGetMyAccount;
