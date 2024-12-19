import { myCaptureException } from "@utils/sentry";
import { supabase } from "@utils/supabase";

export const getLikes = async (userId: string) => {
  const {data, error} = await supabase
    .from("likes")
    .select("liked_by_user_id")
    .eq("user_id", userId)

  if (error) {
    myCaptureException(error);
    throw new Error("Error getting likes", { cause: error });
  }
  return data;
}