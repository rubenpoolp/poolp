import i18n from "@/utils/i18n";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import getMyDailyCircleQuery from "./getMyDailyCircle.query";

const useGetMyDailyCircle = (user_id: string | undefined) => {
  return useQuery({
    queryKey: ["circle", user_id, format(new Date(), "yyyy-MM-dd")], // Date of the day
    queryFn: () => {
      if (user_id === undefined) throw new Error(i18n.t("errors.pleaseLogin"));

      return getMyDailyCircleQuery(user_id);
    },
    enabled: !!user_id,
    initialData: undefined,
  });
};

export default useGetMyDailyCircle;
