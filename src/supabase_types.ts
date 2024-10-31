import { Database } from "database";

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
