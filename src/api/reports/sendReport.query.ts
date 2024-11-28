import { Reports } from "@supabase_types";
import i18n from "@utils/i18n";
import { myCaptureException } from "@utils/sentry";
import { supabase } from "@utils/supabase";

async function sendReport(report: Partial<Reports>) {
  const { data, error } = await supabase
    .from("reports")
    .insert(report)

  if (error) {
    myCaptureException(error);
    throw new Error(i18n.t("errors.didNotWorkPleaseRetry"));
  }

  return data;
}

export default sendReport;
