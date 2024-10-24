import i18n from "@/utils/i18n";
import { useQuery } from "@tanstack/react-query";
import getAccounts from "./getAccounts.query";

const useGetAccounts = (user_ids: string[]) => {
  return useQuery({
    queryKey: ["accounts", user_ids],
    queryFn: () => {
      if (user_ids.length === 0) {
        throw new Error(i18n.t("errors.pleaseLogin"));
      }

      return getAccounts(user_ids);
    },
    enabled: !!user_ids,
    initialData: undefined,
  });
};

export default useGetAccounts;
