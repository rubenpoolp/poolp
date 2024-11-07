import useGetPastCircles from "@/api/circles/getPastCircles.hook";
import { PastCircle } from "@/types/circles";
import { useIsLoading } from "@context/IsLoading";
import { useEffect, useState } from "react";

const usePastCircles = () => {
  const [pastCircles, setPastCircles] = useState<PastCircle[]>([]);
  const { data: pastCirclesData } = useGetPastCircles();
  // const { data: users } = useGetAccounts(circle?.user_ids ?? []);
  // const { data: usersProfilePics } = useGetUsersProfilePics(
  //   users?.map((u) => u.id),
  // );
  const { setIsLoading } = useIsLoading();

  useEffect(() => {
    setIsLoading(true);
    if (!pastCirclesData) return;
    setPastCircles(pastCirclesData);
    setIsLoading(false);
  }, [pastCirclesData, setIsLoading]);

  return { pastCircles };
};

export default usePastCircles;
