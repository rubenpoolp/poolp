import i18n from "@utils/i18n";
import { myCaptureException } from "@utils/sentry";
import { supabase } from "@utils/supabase";

async function addProfilePic(userId: string, urls: string[]) {
  const { data, error } = await supabase.from("profile_pics").upsert(
    {
      user_id: userId,
      urls,
    },
    { onConflict: "user_id" },
  );

  if (error) {
    console.log("error", error);
    myCaptureException(error);
    throw new Error(i18n.t("errors.didNotWorkPleaseRetry"), { cause: error });
  }

  return data;
}

export default addProfilePic;
