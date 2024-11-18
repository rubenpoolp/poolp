import { myCaptureException } from "@utils/sentry";
import { supabase } from "@utils/supabase";

async function updateLastInteraction(userId: string) {
  const { data, error } = await supabase
    .from("users")
    .update({ last_interaction_at: new Date() })
    .eq("id", userId);

  if (error) {
    myCaptureException(error);
    throw new Error("Error updating last interaction", { cause: error });
  }

  return data;
}

export default updateLastInteraction;