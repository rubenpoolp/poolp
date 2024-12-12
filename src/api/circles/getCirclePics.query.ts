import { CIRCLE_PICS_BUCKET, CirclePic } from "@supabase_types";
import i18n from "@utils/i18n";
import { myCaptureException } from "@utils/sentry";
import { supabase } from "@utils/supabase";

async function getCirclePics(circleId: string, userId: string) {
  const { data, error } = await supabase
    .from(CIRCLE_PICS_BUCKET)
    .select("*")
    .eq("circle_id", circleId)
    .order("created_at", { ascending: true })
    .returns<CirclePic[]>();

  if (error) {
    myCaptureException(error);
    throw new Error(i18n.t("errors.didNotWorkPleaseRetry"), { cause: error });
  }

  return data;
}

export default getCirclePics;
