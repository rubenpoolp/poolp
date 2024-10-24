import i18n from "@/utils/i18n";
import { myCaptureException } from "@utils/sentry";
import { supabase } from "@utils/supabase";

async function getMyAccount(user_id: string) {
  const { data, error } = await supabase
    .from("account")
    .select("*")
    .eq("id", user_id)
    .single();

  if (error) {
    myCaptureException(error);
    throw new Error(i18n.t("errors.didNotWorkPleaseRetry"));
  }

  return data;
}

export default getMyAccount;
