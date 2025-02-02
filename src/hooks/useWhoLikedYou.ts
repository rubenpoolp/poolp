import useGetAccounts from "@api/account/getAccounts.hook";
import useGetLikes from "@api/likes/getLikes.hook";
import useGetUsersProfilePics from "@api/profilePics/getUsersProfilePics.hook";
import useGetRings from "@api/rings/getRings.hook";
import { useAuth } from "@context/Auth";

type UserToDiscover = {
  name: string;
  avatar: string;
  liked: boolean;
  ringed: boolean;
};

export const useWhoLikedYou = () => {
  const auth = useAuth();
  const userId = auth.user?.id ?? "";

  const usersWhoLiked = useGetLikes(userId);
  const usersWhoRinged = useGetRings(userId);

  // Get unique user ids
  const uniqueUserIds = [
    ...(usersWhoLiked.data || []).map((like) => like.liked_by_user_id),
    ...(usersWhoRinged.data || []).map((ring) => ring.ring_by_user_id),
  ].filter((item) => item !== null);
  const uniqueIds = [...new Set(uniqueUserIds)];

  // Get user accounts
  const usersAccounts = useGetAccounts(uniqueIds);

  // Get user profile pics
  const { data: usersProfilePics } = useGetUsersProfilePics(
    usersAccounts.data?.map((u) => u.id),
  );

  // Transform data to UserToDiscover format
  const usersToDiscover: UserToDiscover[] = usersAccounts.data?.map((user) => ({
    name: user.name,
    avatar: usersProfilePics?.find((pic) =>
      pic.user_id === user.id
    )?.urls?.[0] ??
      "",
    liked:
      usersWhoLiked.data?.some((like) => like.liked_by_user_id === user.id) ??
        false,
    ringed:
      usersWhoRinged.data?.some((ring) => ring.ring_by_user_id === user.id) ??
        false,
    userProfilePics: usersProfilePics?.find(
      (pic) => pic.user_id === user.id,
    ) ?? {
      urls: [],
      user_id: user.id,
      user_name: user.name,
    },
  })) ?? [];

  const isLoading = usersWhoLiked.isLoading ||
    usersWhoRinged.isLoading ||
    usersAccounts.isLoading;

  const error = usersWhoLiked.error || usersWhoRinged.error ||
    usersAccounts.error;

  return {
    users: usersToDiscover,
    isLoading,
    error,
    refetch: () => {
      usersWhoLiked.refetch();
      usersWhoRinged.refetch();
      usersAccounts.refetch();
    },
  };
};
