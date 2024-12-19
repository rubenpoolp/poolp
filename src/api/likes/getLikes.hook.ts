import { useQuery } from "@tanstack/react-query";
import { getLikes } from "./getLikes.query";

const useGetLikes = (userId: string) => {
  return useQuery({
    queryKey: ["getLikes", userId],
    queryFn: () => {
      return getLikes(userId);
    },
    enabled: !!userId,
    initialData: undefined,
    refetchOnWindowFocus: true,
  });
};

export default useGetLikes;