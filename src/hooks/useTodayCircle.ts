import useGetAccounts from "@api/account/getAccounts.hook";
import useGetCirclePics from "@api/circles/getCirclePics.hook";
import useGetMyDailyCircle from "@api/circles/getMyDailyCircle.hook";
import useGetUsersProfilePics from "@api/profilePics/getUsersProfilePics.hook";
import { getDateLastTimeWentOnCircle } from "@utils/circles";
import { formatStoryDate } from "@utils/dates";
import { format } from "date-fns";
import { useEffect, useState } from "react";

const useTodayCircle = () => {
  const { data: circle } = useGetMyDailyCircle();
  const { data: users } = useGetAccounts(circle?.user_ids ?? []);
  const { data: usersProfilePics } = useGetUsersProfilePics(
    users?.map((u) => u.id),
  );
  const { data: circlePics } = useGetCirclePics(circle?.id);

  const [unseenStories, setUnseenStories] = useState<boolean>(false);

  const sortedByDateCirclePics = circlePics.sort((a, b) =>
    a?.created_at > b?.created_at ? 1 : 0
  );
  const mappedStories = sortedByDateCirclePics.map((pic) => ({
    ...pic,
    userName: users?.find((u) => u.id === pic.user_id)?.name ?? "",
    userProfilePictureUrl: usersProfilePics?.find(
      (p) => p.user_id === pic.user_id,
    )?.urls?.[0],
    createdAtFormatted: formatStoryDate(new Date(pic.created_at)),
  }));
  // Remove stories from deleted users
  const stories = mappedStories.filter((story) => {
    return users?.some((user) => user.id === story.user_id);
  });

  useEffect(() => {
    const fetchLastViewedDate = async () => {
      const lastViewedDate = await getDateLastTimeWentOnCircle();
      if (!lastViewedDate) return false;
      const index = stories.findIndex((story) => {
        return Number(format(story.created_at, "t")) > Number(lastViewedDate);
      });
      setUnseenStories(index >= 0);
    };

    fetchLastViewedDate();
  }, [stories]);

  if (!usersProfilePics) return { stories };

  return {
    stories,
    usersProfilePics,
    unseenStories,
  };
};

export default useTodayCircle;
