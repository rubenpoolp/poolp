import { PostHogProvider } from "posthog-react-native";
import { ReactNode } from "react";

const MyPostHogProvider = ({ children }: { children: ReactNode }) => {
  return (
    <PostHogProvider
      apiKey={process.env.EXPO_PUBLIC_POSTHOG_API_KEY}
      options={{
        host: "https://eu.i.posthog.com",
        disabled: __DEV__,
      }}
      autocapture
    >
      {children}
    </PostHogProvider>
  );
};

export default MyPostHogProvider;
