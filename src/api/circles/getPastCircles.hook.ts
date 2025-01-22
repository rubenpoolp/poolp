import i18n from "@/utils/i18n";
import getAccounts from "@api/account/getAccounts.query";
import getProfilePics from "@api/profilePics/getProfilePics.query";
import { useAuth } from "@context/Auth";
import { useQuery } from "@tanstack/react-query";
import { formatPastCircleDate, formatPastCircleLittleDate } from "@utils/dates";
import { getProfilePicsStorageUrl } from "@utils/getStorageUrl";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import getPastCirclesQuery from "./getPastCircles.query";

const useGetPastCircles = () => {
  const auth = useAuth();
  const { t } = useTranslation();
  const userId = auth.user?.id;

  return useQuery({
    queryKey: ["pastCircles", userId, format(new Date(), "yyyy-MM-dd")], // Date of the day
    queryFn: async () => {
      if (userId === undefined) throw new Error(i18n.t("errors.pleaseLogin"));

      // remove the last one (because it's the daily circle)
      const pastCircles = await getPastCirclesQuery(userId).then((data) =>
        data.slice(1, 20)
      );
      const formattedPastCircles = pastCircles.map((circle) => ({
        id: circle.id,
        name: t("pastCircle.title"),
        littleFormattedDate: formatPastCircleLittleDate(
          new Date(circle.created_at),
        ),
        formattedDate: formatPastCircleDate(new Date(circle.created_at)),
        userIds: circle.user_ids,
        participants: [],
      }));

      const pastCirclesWithPicture = await Promise.all(
        formattedPastCircles.map(async (circle) => {
          if (circle.userIds === null) return circle;

          const userIdsWithoutCurrentUser = circle.userIds.filter(
            (id) => id !== userId,
          );

          const accounts = await getAccounts(userIdsWithoutCurrentUser);
          const participants = await Promise.all(
            accounts?.map(async (account) => {
              const avatar = await getProfilePics(account.id);
              let firstPicture = undefined;
              if (avatar?.urls && avatar.urls.length > 0) {
                firstPicture = await getProfilePicsStorageUrl(avatar.urls[0]);
              }

              return {
                id: account.id,
                avatar: firstPicture,
                name: account.name,
              };
            }),
          );
          return { ...circle, participants };
        }),
      );

      return pastCirclesWithPicture;
    },
    enabled: !!userId,
    initialData: undefined,
  });
};

export default useGetPastCircles;
