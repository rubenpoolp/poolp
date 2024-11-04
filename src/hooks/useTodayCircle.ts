import { UserStories } from "@/types/story";
import useGetMyDailyCircle from "@api/circles/getMyDailyCircle.hook";
import useGetUsersProfilePics from "@api/profilePics/getUsersProfilePics.hook";
import useGetAccounts from "@api/users/getAccounts.hook";
import assets from "@assets/index";
import { useAuth } from "@context/Auth";
import { formatStoryDate } from "@utils/dates";
import { subDays, subHours } from "date-fns";

const example_assets = [assets.test1, assets.test2];

const useTodayCircle = () => {
  const { user } = useAuth();
  const { data: circle } = useGetMyDailyCircle(user?.id);
  const { data: users } = useGetAccounts(circle?.user_ids ?? []);
  const { data: usersProfilePics } = useGetUsersProfilePics(
    users?.map((u) => u.id),
  );
  const stories = users?.map((user, index) => {
    const stories: UserStories = example_assets.map((pic, picIndex) => ({
      id: picIndex + index,
      picture: pic,
      createdAt: formatStoryDate(subDays(new Date(), 1)),
      updatedAt: formatStoryDate(subHours(new Date(), 1)),
      userName: user?.name,
      userProfilePictureUrl: usersProfilePics?.find(
        (p) => p.user_id === user.id,
      )?.urls?.[0],
    }));
    return stories;
  });

  if (!usersProfilePics) return { stories };

  return {
    stories,
    usersProfilePics,
  };
};

export default useTodayCircle;
