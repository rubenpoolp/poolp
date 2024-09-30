import * as Sentry from "@sentry/react-native";
import * as Application from "expo-application";
import * as Updates from "expo-updates";

Sentry.init({
  release: "poolp@" +
    Application.nativeApplicationVersion +
    "Update:" +
    Updates.updateId,
  dsn: "",
  tracesSampleRate: 1.0,
  enabled: !__DEV__,
});

export const myCaptureException = (error: Error) => {
  Sentry.captureException(error);
};
