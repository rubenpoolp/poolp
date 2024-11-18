import useGetPastCircles from "@/api/circles/getPastCircles.hook";
import { PastCircle } from "@/types/circles";
import { useEffect, useState } from "react";

const usePastCircles = () => {
  const [pastCircles, setPastCircles] = useState<PastCircle[]>([]);
  const { data: pastCirclesData } = useGetPastCircles();
  // const { data: users } = useGetAccounts(circle?.user_ids ?? []);
  // const { data: usersProfilePics } = useGetUsersProfilePics(
  //   users?.map((u) => u.id),
  // );

  useEffect(() => {
    if (!pastCirclesData) return;
    setPastCircles(pastCirclesData);
  }, [pastCirclesData]);

  return { pastCircles };
};

export default usePastCircles;
