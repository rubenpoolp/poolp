import { usePostHog } from "posthog-react-native";

const useAnalytics = () => {
  const posthog = usePostHog();

  const identify = (userID: string, email?: string) => {
    posthog.identify(userID, { email });
  };

  const capture = (
    key: string,
    properties: {
      [key: string]: any;
    },
  ) => {
    posthog.capture(key, properties);
  };

  return {
    identify,
    capture,
    optIn: posthog.optIn(),
    optOut: posthog.optOut(),
    reset: posthog.reset(),
  };
};

export default useAnalytics;
