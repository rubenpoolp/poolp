import { CIRCLE_PICS_BUCKET, CirclePic } from "@supabase_types";
import i18n from "@utils/i18n";
import { myCaptureException } from "@utils/sentry";
import { supabase } from "@utils/supabase";

async function addCirclePic(circleId: string, userId: string, url: string) {
  const insertData: CirclePic = {
    circle_id: circleId,
    user_id: userId,
    url,
  };
  const { data, error } = await supabase.from(CIRCLE_PICS_BUCKET).insert(
    insertData,
  );

  if (error) {
    myCaptureException(error);
    throw new Error(i18n.t("errors.didNotWorkPleaseRetry"), { cause: error });
  }

  return data;
}

export default addCirclePic;
