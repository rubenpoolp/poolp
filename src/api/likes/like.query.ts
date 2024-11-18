import { useAuth } from "@context/Auth";
import { Likes } from "@supabase_types";
import { myCaptureException } from "@utils/sentry";
import { supabase } from "@utils/supabase";

export const like = async (circleId: string, userId: string) => {
  const auth = useAuth();

  if (!auth?.user?.id) {
    throw new Error("User not authenticated");
  }

  const insertData: Partial<Likes> = {
    circle_id: circleId,
    user_id: userId,
    liked_by_user_id: auth?.user?.id,
  }

  const {data, error} = await supabase.from("likes").insert(insertData);

  if (error) {
    myCaptureException(error);
    throw new Error("Error liking circle", { cause: error });
  }

  return data;  
}