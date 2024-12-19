import { myCaptureException } from "@utils/sentry";
import { supabase } from "@utils/supabase";

export const getRings = async (userId: string) => {
  const {data, error} = await supabase
    .from("rings")
    .select("ring_by_user_id")
    .eq("user_id", userId)
    .not("ring_by_user_id", "is", null);

    console.log("getRings")
  if (error) {
    myCaptureException(error);
    throw new Error("Error getting rings", { cause: error });
  }
  return data;
}