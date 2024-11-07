import { PastCircle } from "@/types/circles";
import i18n from "@/utils/i18n";
import assets from "@assets/index";
import { useAuth } from "@context/Auth";
import { useQuery } from "@tanstack/react-query";
import { formatPastCircleDate, formatPastCircleLittleDate } from "@utils/dates";
import { format } from "date-fns";
import getOldCirclesQuery from "./getOldCircles.query";

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
const useGetOldCircles = () => {
  const auth = useAuth();
  const userId = auth.user?.id;

  return useQuery({
    queryKey: ["oldCircles", userId, format(new Date(), "yyyy-MM-dd")], // Date of the day
    queryFn: async () => {
      if (userId === undefined) throw new Error(i18n.t("errors.pleaseLogin"));

      // remove the last one (because it's the daily circle)
      const oldCircles = await getOldCirclesQuery(userId).then((data) =>
        data.slice(0, 10)
      );
      const formattedOldCircles: PastCircle[] = oldCircles.map((circle) => ({
        id: circle.id,
        name: "Past Circle",
        littleFormattedDate: formatPastCircleLittleDate(
          new Date(circle.created_at),
        ),
        formattedDate: formatPastCircleDate(new Date(circle.created_at)),

        participants: [
          {
            id: "test",
            avatar: assets.defaultProfilePicture,
            name: "test",
          },
        ],
      }));

      return formattedOldCircles;
    },
    enabled: !!userId,
    initialData: undefined,
  });
};

export default useGetOldCircles;
