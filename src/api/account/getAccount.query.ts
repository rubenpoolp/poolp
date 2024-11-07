import i18n from "@/utils/i18n";
import { Account } from "@supabase_types";
import { myCaptureException } from "@utils/sentry";
import { supabase } from "@utils/supabase";

async function getAccount(user_id: string | undefined) {
  const { data, error } = await supabase
    .from("account")
    .select("*")
    .eq("id", user_id)
    .returns<Account[]>()
    .single();

  if (error) {
    myCaptureException(error);
    throw new Error(i18n.t("errors.didNotWorkPleaseRetry"));
  }

  return data;
}

export default getAccount;
