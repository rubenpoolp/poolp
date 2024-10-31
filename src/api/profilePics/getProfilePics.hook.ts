import { useQuery } from "@tanstack/react-query";
import getProfilePics from "./getProfilePics.query";

const useGetProfilePics = (userId?: string) => {
  return useQuery({
    queryKey: ["profilePics", userId],
    queryFn: async () => {
      if (!userId) return undefined;

      const profilePics = await getProfilePics(userId);
      if (!profilePics) return undefined;

      return profilePics.urls;
    },
    initialData: undefined,
    enabled: !!userId,
  });
};

export default useGetProfilePics;
