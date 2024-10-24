import { School } from "@supabase_types";
import i18n from "@utils/i18n";
import { myCaptureException } from "@utils/sentry";
import { supabase } from "@utils/supabase";

async function getSchools() {
  const { data, error } = await supabase
    .from("schools")
    .select("*")
    .returns<School[]>();

  if (error) {
    myCaptureException(error);
    throw new Error(i18n.t("errors.didNotWorkPleaseRetry"));
  }

  return data;
}

export default getSchools;
