import { CIRCLE_PICS_BUCKET } from "@supabase_types";
import i18n from "@utils/i18n";
import { myCaptureException } from "@utils/sentry";
import { supabase } from "@utils/supabase";

async function deleteCirclePic(circleId: string, circlePicId: string) {
  const { data, error } = await supabase
    .from(CIRCLE_PICS_BUCKET)
    .delete()
    .eq("circle_id", circleId)
    .eq("id", circlePicId);

  if (error) {
    myCaptureException(error);
    throw new Error(i18n.t("errors.didNotWorkPleaseRetry"), { cause: error });
  }

  return data;
}

export default deleteCirclePic;
