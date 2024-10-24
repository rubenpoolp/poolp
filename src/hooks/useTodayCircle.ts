import useGetMyDailyCircle from "@api/circles/getMyDailyCircle.hook";
import useGetAccounts from "@api/users/getAccounts.hook";
import assets from "@assets/index";
import { useAuth } from "@context/Auth";

const useTodayCircle = () => {
  const { user } = useAuth();
  const { data: circle } = useGetMyDailyCircle(user?.id);
  const { data: users } = useGetAccounts(circle?.user_ids);

  return {
    stories: users?.map((user, index) => ({
      id: user?.id,
      name: user?.name,
      pictures: [index === 0 ? assets.test1 : assets.test2],
    })),
  };
};

export default useTodayCircle;
