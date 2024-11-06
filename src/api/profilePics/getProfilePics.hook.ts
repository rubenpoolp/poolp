import { useAuth } from "@context/Auth";
import { useQuery } from "@tanstack/react-query";
import getProfilePics from "./getProfilePics.query";

const useGetProfilePics = () => {
  const auth = useAuth();
  const userId = auth.user?.id;

  return useQuery({
    queryKey: ["profilePics", userId],
    queryFn: async () => {
      if (!userId) throw new Error("User ID not found");

      const profilePics = await getProfilePics(userId);
      if (!profilePics) return [];

      return profilePics.urls;
    },
    initialData: undefined,
    enabled: !!userId,
  });
};

export default useGetProfilePics;
