import i18n from "@/utils/i18n";
import { Circle } from "@supabase_types";
import { myCaptureException } from "@utils/sentry";
import { supabase } from "@utils/supabase";
import { format } from "date-fns";

async function getMyDailyCircleQuery(user_id: string) {
  // user_ids is a column of the circles table that contains the user_ids of the users in the circle
  const { data, error } = await supabase
    .from("circles")
    .select("*")
    .contains("user_ids", [user_id])
    .gte("created_at", format(new Date(), "yyyy-MM-dd"))
    .returns<Circle[]>()
    .single();

  if (error) {
    myCaptureException(error);
    throw new Error(i18n.t("errors.didNotWorkPleaseRetry"));
  }

  return data;
}

export default getMyDailyCircleQuery;
