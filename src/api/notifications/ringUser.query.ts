import { Rings } from "@supabase_types";
import { myCaptureException } from "@utils/sentry";
import { supabase } from "@utils/supabase";

export const ringUser = async (circleId: string, ringByUserId: string, userId: string): Promise<boolean> => {
  const insertData: Partial<Rings> = {
    circle_id: circleId,
    ring_by_user_id: ringByUserId,
    user_id: userId,
  }

  const {data, error} = await supabase
    .from("rings")
    .select("created_at")
    .eq("user_id", userId)
    .eq("circle_id", circleId)
    .eq("ring_by_user_id", ringByUserId)
    .order("created_at", { ascending: false })
    .limit(1);

  if (error) {
    myCaptureException(error);
    throw new Error("Error getting last ring", { cause: error });
  }

  if (data && data.length > 0) {
    if (!data?.[0]?.created_at)
      return false;
    
    const lastRingDate = new Date(data[0].created_at);
    const currentDate = new Date();
    const diffInMinutes = (currentDate.getTime() - lastRingDate.getTime()) / (1000 * 60);
    
    if (diffInMinutes < 5)
      return false;
  }

  
  const { data: _, error: insertError } = await supabase
    .from("rings")
    .insert(insertData);

  if (insertError) {
    myCaptureException(insertError);
    throw new Error("Error ringing user", { cause: insertError });
  }

  return true;
}