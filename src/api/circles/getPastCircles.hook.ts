import i18n from "@/utils/i18n";
import getProfilePics from "@api/profilePics/getProfilePics.query";
import getAccounts from "@api/account/getAccounts.query";
import { useAuth } from "@context/Auth";
import { useQuery } from "@tanstack/react-query";
import { formatPastCircleDate, formatPastCircleLittleDate } from "@utils/dates";
import { getProfilePicsStorageUrl } from "@utils/getStorageUrl";
import { format } from "date-fns";
import getPastCirclesQuery from "./getPastCircles.query";

// {
//   id: 7,
//   name: "Past circle",
//   date: new Date(2023, 8, 17),
//   participants: [
//     { id: 0, avatar: assets.defaultProfilePicture, name: "John Doe" },
//     { id: 1, avatar: assets.defaultProfilePicture, name: "Jane Doe" },
//     { id: 2, avatar: assets.defaultProfilePicture, name: "John Doe" },
//   ],
// },
const useGetPastCircles = () => {
  const auth = useAuth();
  const userId = auth.user?.id;

  return useQuery({
    queryKey: ["pastCircles", userId, format(new Date(), "yyyy-MM-dd")], // Date of the day
    queryFn: async () => {
      if (userId === undefined) throw new Error(i18n.t("errors.pleaseLogin"));

      // remove the last one (because it's the daily circle)
      const pastCircles = await getPastCirclesQuery(userId).then((data) =>
        data.slice(0, 10)
      );
      const formattedPastCircles = pastCircles.map((circle) => ({
        id: circle.id,
        name: "Past Circle",
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
