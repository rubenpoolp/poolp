import { Rings } from "@supabase_types";
import { myCaptureException } from "@utils/sentry";
import { supabase } from "@utils/supabase";

export const ringUser = async (circleId: string, ringByUserId: string, userId: string) => {
  const insertData: Rings = {
    circle_id: circleId,
    ring_by_user_id: ringByUserId,
    user_id: userId,
  }

  const {data, error} = await supabase.from("rings").insert(insertData);

  if (error) {
    myCaptureException(error);
    throw new Error("Error ringing user", { cause: error });
  }

  return data;
}