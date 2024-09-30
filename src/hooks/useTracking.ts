import { requestTrackingPermissionsAsync } from "expo-tracking-transparency";
import { usePostHog } from "posthog-react-native";
import { useEffect } from "react";

const useTracking = () => {
  const posthog = usePostHog();

  useEffect(() => {
    (async () => {
      const { status } = await requestTrackingPermissionsAsync();
      if (status !== "granted") {
        posthog.optOut();
      } else {
        posthog.optIn();
      }
    })();
  }, [posthog]);
};

export default useTracking;
