import i18n from "@/utils/i18n";
import { myCaptureException } from "@utils/sentry";
import { supabase } from "@utils/supabase";

async function getAccounts(user_ids: string[]) {
  const { data, error } = await supabase
    .from("account")
    .select("*")
    .in("id", user_ids);

  if (error) {
    myCaptureException(error);
    throw new Error(i18n.t("errors.didNotWorkPleaseRetry"));
  }

  return data;
}

export default getAccounts;
