import useGetMyDailyCircle from "@api/circles/getMyDailyCircle.hook";
import useGetAccounts from "@api/users/getAccounts.hook";
import assets from "@assets/index";
import { useAuth } from "@context/Auth";
import { UserStories } from "@types/story";
import { format } from "date-fns";

const example_assets = [assets.test1, assets.test2];

const useTodayCircle = () => {
  const { user } = useAuth();
  const { data: circle } = useGetMyDailyCircle(user?.id);
  const { data: users } = useGetAccounts(circle?.user_ids ?? []);
  const stories = users?.map((user, index) => {
    const stories: UserStories = example_assets.map((pic, picIndex) => ({
      id: picIndex + index,
      picture: pic,
      createdAt: format(new Date(), "LLL"),
      updatedAt: format(new Date(), "LLL"),
      userName: user?.name,
      userProfilePictureUrl:
        "https://dam.malt.com/0dd02c75-e1f6-4407-914b-acca8f88755d?gravity=face&func=face&face_margin=70&w=440&h=440&force_format=webp",
    }));
    return stories;
  });

  return {
    stories,
  };
};

export default useTodayCircle;
