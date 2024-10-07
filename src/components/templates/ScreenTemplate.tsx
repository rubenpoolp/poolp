// import useAutoCapturePostHog from "@/hooks/useAutoCapturePostHog";
import { ReactNode } from "react";
import { Platform, View } from "react-native";
import {
  Edge,
  SafeAreaProvider,
  SafeAreaView,
} from "react-native-safe-area-context";

interface ScreenTemplateProps {
  children: ReactNode;
  transparent?: boolean;
  className?: string;
  style?: any;
  edges?: Edge[];
}

const ScreenTemplate = ({
  children,
  transparent = false,
  style,
  edges,
}: ScreenTemplateProps) => {
  // useAutoCapturePostHog();

  return (
    <SafeAreaProvider>
      <SafeAreaView
        className={`flex-1 ${!transparent && "bg-beige"} ${Platform.OS !== "ios" && "pt-4 pb-4"} ${Platform.OS === "web" && "pt-10"}`}
        edges={edges}
      >
        <View
          className={`flex-1 px-4 items-center justify-between self-center w-full md:px-40 lg:px-60 xl:px-80`}
          style={style}
        >
          {children}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default ScreenTemplate;
