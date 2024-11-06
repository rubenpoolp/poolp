import useGetCirclePics from "@api/circles/getCirclePics.hook";
import useGetMyDailyCircle from "@api/circles/getMyDailyCircle.hook";
import useGetUsersProfilePics from "@api/profilePics/getUsersProfilePics.hook";
import useGetAccounts from "@api/users/getAccounts.hook";
import assets from "@assets/index";
import { formatStoryDate } from "@utils/dates";

const example_assets = [assets.test1, assets.test2];

const useTodayCircle = () => {
  const { data: circle } = useGetMyDailyCircle();
  const { data: users } = useGetAccounts(circle?.user_ids ?? []);
  const { data: usersProfilePics } = useGetUsersProfilePics(
    users?.map((u) => u.id),
  );
  const { data: circlePics } = useGetCirclePics(circle?.id);

  const mappedStories = circlePics.map((pic) => ({
    ...pic,
    userName: users?.find((u) => u.id === pic.user_id)?.name,
    userProfilePictureUrl: usersProfilePics?.find(
      (p) => p.user_id === pic.user_id,
    )?.urls?.[0],
    createdAtFormatted: formatStoryDate(new Date(pic.created_at)),
  }));
  console.log("mappedStories", mappedStories);
  const stories = mappedStories.sort((a, b) =>
    a?.user_id === b?.user_id ? 1 : 0
  );

  if (!usersProfilePics) return { stories };

  return {
    stories,
    usersProfilePics,
  };
};

export default useTodayCircle;
