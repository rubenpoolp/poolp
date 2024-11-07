import i18n from "@/utils/i18n";
import { Circle } from "@supabase_types";
import { myCaptureException } from "@utils/sentry";
import { supabase } from "@utils/supabase";

async function getOldCirclesQuery(user_id: string) {
  // user_ids is a column of the circles table that contains the user_ids of the users in the circle
  const { data, error } = await supabase
    .from("circles")
    .select("*")
    .contains("user_ids", [user_id])
    .order("created_at", { ascending: false })
    .limit(50)
    .returns<Circle[]>();

  if (error) {
    myCaptureException(error);
    throw new Error(i18n.t("errors.didNotWorkPleaseRetry"));
  }

  return data;
}

export default getOldCirclesQuery;
