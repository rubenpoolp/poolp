import i18n from "@utils/i18n";
import { myCaptureException } from "@utils/sentry";
import { supabase } from "@utils/supabase";

async function blockUser(fromUserId: string, toUserId: string) {
  const { data, error } = await supabase
    .from("blocks")
    .insert({ from_user_id: fromUserId, to_user_id: toUserId });

  if (error) {
    myCaptureException(error);
    throw new Error(i18n.t("errors.didNotWorkPleaseRetry"));
  }

  return data;
}

export default blockUser;
