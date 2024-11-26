import i18n from "@utils/i18n";
import { myCaptureException } from "@utils/sentry";
import { supabase } from "@utils/supabase";

async function getLastInteractionFromCircleUsers(userIds: string[]) {
  const { data, error } = await supabase
    .from("account")
    .select("last_interaction_at, id")
    .in("id", userIds)

  if (error) {
    myCaptureException(error);
    throw new Error(i18n.t("errors.didNotWorkPleaseRetry"), { cause: error });
  }

  return data;
}

export default getLastInteractionFromCircleUsers;
