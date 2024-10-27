export type Story = {
  picture: ImageProps["source"];
  createdAt: string;
  updatedAt: string;
  userName: string;
  userProfilePictureUrl: string;
};

export type UserStories = Story[];
