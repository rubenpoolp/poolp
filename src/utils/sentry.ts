import * as Sentry from "@sentry/react-native";
import { PostgrestError } from "@supabase/supabase-js";
import * as Application from "expo-application";
import * as Updates from "expo-updates";

Sentry.init({
  release: "poolp@" +
    Application.nativeApplicationVersion +
    "Update:" +
    Updates.updateId,
  dsn:
    "https://92856ea757828d2bdbaa38ae33d9f2c8@o4508161573847040.ingest.de.sentry.io/4508161600061520",
  tracesSampleRate: 1.0,
  enabled: true,
});

export const myCaptureException = (error: Error | PostgrestError) => {
  Sentry.captureException(error);
};
