export type Story = {
  picture: ImageProps["source"];
  createdAt: string;
  updatedAt: string;
  userName: string;
  userProfilePictureUrl?: string;
};

export type UserProfilePics = {
  urls?: string[];
  user_id: string;
  user_name: string;
};

export type UserStories = Story[];
