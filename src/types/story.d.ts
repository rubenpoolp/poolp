import { CirclePic } from "@supabase_types";

export type Story = CirclePic & {
  userName: string;
  userProfilePictureUrl?: string;
  createdAtFormatted: string;
};

export type UserProfilePics = {
  urls?: string[];
  user_id: string;
  user_name: string;
};
