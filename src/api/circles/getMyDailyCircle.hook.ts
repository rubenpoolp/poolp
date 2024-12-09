import i18n from "@/utils/i18n";
import { useAuth } from "@context/Auth";
import { useQuery } from "@tanstack/react-query";
import { differenceInHours, format } from "date-fns";
import getMyDailyCircleQuery from "./getMyDailyCircle.query";

const useGetMyDailyCircle = () => {
  const auth = useAuth();
  const userId = auth.user?.id;

  return useQuery({
    queryKey: ["circle", userId, format(new Date(), "yyyy-MM-dd")],
    queryFn: async () => {
      if (userId === undefined) throw new Error(i18n.t("errors.pleaseLogin"));

      const circle = await getMyDailyCircleQuery(userId);
      if (!circle) {
        throw new Error(i18n.t("errors.noCircleFound"));
      }

      const hoursSinceCreation = differenceInHours(
        new Date(),
        new Date(circle.created_at),
      );

      if (hoursSinceCreation >= 24) {
        return null;
      }
      return circle;
    },
    enabled: !!userId,
    initialData: null,
  });
};

export default useGetMyDailyCircle;
