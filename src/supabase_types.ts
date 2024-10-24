import { Database } from "database";

export type Account = Database["public"]["Tables"]["account"]["Row"];
export type Circle = Database["public"]["Tables"]["circles"]["Row"];
export type School = Database["public"]["Tables"]["schools"]["Row"];