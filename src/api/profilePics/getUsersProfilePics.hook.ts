import { useAuth } from "@context/Auth";
import { getAccountById } from "@queries/account.query";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@utils/supabase";
import getProfilePics from "./getProfilePics.query";

const useGetUsersProfilePics = (userIds?: string[]) => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["profilePics", userIds],
    queryFn: async () => {
      if (!userIds) return undefined;

      const usersProfilePics = await Promise.all(
        userIds.map(async (userId) => {
          const profilePics = await getProfilePics(userId);
          const { account: accountResult } = await getAccountById(userId);
          const { data: { publicUrl } } = await supabase.storage
            .from("profilePics")
            .getPublicUrl("");

          if (!profilePics) {
            return { user_id: userId, user_name: accountResult?.name };
          }
          const newProfilePics = profilePics?.urls?.map((url) =>
            publicUrl + url
          );

          return {
            urls: newProfilePics,
            user_id: userId,
            user_name: accountResult?.name,
          };
        }),
      );

      const withoutCurrentUser = usersProfilePics.filter(
        (p) => p?.user_id !== user?.id,
      );

      return withoutCurrentUser;
    },
    initialData: undefined,
    enabled: !!userIds,
  });
};

export default useGetUsersProfilePics;
