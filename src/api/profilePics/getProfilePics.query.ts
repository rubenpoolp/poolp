import { ProfilePic } from "@supabase_types";
import i18n from "@utils/i18n";
import { myCaptureException } from "@utils/sentry";
import { supabase } from "@utils/supabase";

async function getProfilePics(userId: string) {
  const { data, error } = await supabase
    .from("profile_pics")
    .select("*")
    .eq("user_id", userId)
    .returns<ProfilePic[]>()
    .single();

  if (error) {
    if (error.code === "PGRST116") return; // no data found
    myCaptureException(error);
    throw new Error(i18n.t("errors.didNotWorkPleaseRetry"));
  }

  return data;
}

export default getProfilePics;
