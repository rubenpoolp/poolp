import { useIsFocused, useRoute } from "@react-navigation/native";
import { usePostHog } from "posthog-react-native";
import { useEffect } from "react";

const useAutoCapturePostHog = () => {
  const route = useRoute();
  const pathname = route.name;
  const posthog = usePostHog();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (!isFocused) return;
    posthog?.capture("Screen", { "Screen Name": pathname });
  }, [pathname, posthog, isFocused]);
};

export default useAutoCapturePostHog;
