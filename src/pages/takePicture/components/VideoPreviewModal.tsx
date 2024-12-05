import MyModal from "@components/modals/MyModal";
import MyButton from "@components/natives/MyButton";
import MyPressable from "@components/natives/MyPressable";
import { purple } from "@config/colors";
import { CaretLeft } from "phosphor-react-native";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import SnapTexts from "./SnapTexts";
import FinalVideoPlayer from "./VideoPlayer";

interface VideoProps {
  video: { path: string } | null;
  onRetake: () => void;
}

const VideoPreviewModal = ({ video, onRetake }: VideoProps) => {
  const { t } = useTranslation();

  const videoAndTextRef = useRef<View>(null);

  const [isLoading, setIsLoading] = useState(false);

  return (
    <MyModal isVisible={!!video} className="flex-1 bg-background-dark">
      <SafeAreaProvider className="flex-1 w-full h-full">
        <SafeAreaView
          edges={["top", "bottom"]}
          className="flex-1 w-full h-full justify-between"
        >
          <View className="flex-1">
            {isLoading && (
              <ActivityIndicator
                color={purple[100]}
              size="large"
              className="absolute top-0 bottom-0 self-center z-10"
              />
            )}

            {video && (
              <View ref={videoAndTextRef} className="flex-1">
                <FinalVideoPlayer video={video} />
                <SnapTexts />
              </View>
            )}
            <MyPressable
              className="absolute top-3 left-3 p-2"
              onPress={onRetake}
            >
              <CaretLeft />
            </MyPressable>
          </View>

          <View className="w-full px-5 items-center pt-4">
            <MyButton onPress={() => {}} txt={t("camera.send")} />
          </View>

        </SafeAreaView>
      </SafeAreaProvider>
    </MyModal>
  );
};

export default VideoPreviewModal;
