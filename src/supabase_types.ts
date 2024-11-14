import { Database } from "database";

export const PROFILE_PICS_BUCKET = "profilePics";
export const CIRCLE_PICS_BUCKET = "circle_pics";

export type Address = {
  street: string;
  city: string;
  zip: string;
  country: string;
  state?: string;
};

export type Account = Database["public"]["Tables"]["account"]["Row"];
export type Circle = Database["public"]["Tables"]["circles"]["Row"];
export type School = Database["public"]["Tables"]["schools"]["Row"] & {
  address: Address;
};
export type ProfilePic = Database["public"]["Tables"]["profile_pics"]["Row"];
export type CirclePic = Database["public"]["Tables"]["circle_pics"]["Row"];
export type Rings = Database["public"]["Tables"]["rings"]["Row"];