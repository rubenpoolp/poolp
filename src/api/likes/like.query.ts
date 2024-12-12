import { Likes } from "@supabase_types";
import { myCaptureException } from "@utils/sentry";
import { supabase } from "@utils/supabase";

export const like = async (circleId: string, userIdToLike: string, userIdWhoLiked: string) => {
  const insertData: Partial<Likes> = {
    circle_id: circleId,
    user_id: userIdToLike,
    liked_by_user_id: userIdWhoLiked,
  }

  const {data, error} = await supabase
    .from("likes")
    .insert(insertData)
    .select();

  if (error) {
    myCaptureException(error);
    throw new Error("Error liking circle", { cause: error });
  }

  return data;  
}