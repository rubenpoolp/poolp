import i18n from "@/utils/i18n";
import { useAuth } from "@context/Auth";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import getMyDailyCircleQuery from "./getMyDailyCircle.query";

const useGetMyDailyCircle = () => {
  const auth = useAuth();
  const userId = auth.user?.id;

  return useQuery({
    queryKey: ["circle", userId, format(new Date(), "yyyy-MM-dd")], // Date of the day
    queryFn: () => {
      if (userId === undefined) throw new Error(i18n.t("errors.pleaseLogin"));

      return getMyDailyCircleQuery(userId);
    },
    enabled: !!userId,
    initialData: undefined,
  });
};

export default useGetMyDailyCircle;
