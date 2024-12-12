import MyModal from "@components/modals/MyModal";
import MyGradient from "@components/MyGradient";
import MyPressable from "@components/natives/MyPressable";
import MyText from "@components/natives/MyText";
import colors, { purple } from "@config/colors";
import shadow from "@config/shadow";
import { useVideoPlayer } from "@context/VideoPlayerContext";
import * as MediaLibrary from "expo-media-library";
import { ArrowRight, CaretLeft, CheckCircle, DownloadSimple } from "phosphor-react-native";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import ProcessingManager from "react-native-video-processing";
import { captureRef } from "react-native-view-shot";
import SnapTexts from "./SnapTexts";
import FinalVideoPlayer from "./VideoPlayer";


interface VideoProps {
  video: { path: string, external: boolean } | null;
  onRetake: () => void;
  onSend: (uri: string) => void;
  canSend: boolean;
}

const VideoPreviewModal = ({ video, onRetake, onSend, canSend }: VideoProps) => {
  const { t } = useTranslation();
  const videoAndTextRef = useRef<View>(null);

  const { isLoading } = useVideoPlayer();
  const [stateSaveImage, setStateSaveImage] = useState<
    "saving" | "saved" | "error" | null
  >(null);

  const [processing, setProcessing] = useState<boolean>(false);

  const send = async () => {
    if (!video) return;

    const localUri = video.path;

    const localUriWithSnapTexts = await getLocalUriWithSnapTexts();
    console.log("localUriWithSnapTexts", localUriWithSnapTexts);

    onSend(localUri);
  };

  const downloadVideo = async () => {
    if (!video) return;

    const localUri = video.path;

     // download image on device expo camera roll
     await MediaLibrary.saveToLibraryAsync(localUri)
      .catch(() => {
        setStateSaveImage("error");
        return null;
      });

    setStateSaveImage("saved");
    setTimeout(() => {
      setStateSaveImage(null);
    }, 2000);
  }

  const getLocalUriWithSnapTexts = async () => {
    if (!video) return "";
    if (!videoAndTextRef.current) return;

    setProcessing(true);
    try {
      // First capture the SnapTexts overlay
        const overlayUri = await captureRef(videoAndTextRef.current, {
          quality: 1,
          format: "png",
          // transparent: true,
        });
        // Process video with overlay
        const processedVideo = await ProcessingManager.overlay({
          source: video.path,
          overlay: overlayUri,
          position: {
            x: 0,
            y: 0,
          },
        });
        setProcessing(false);
        return processedVideo;
      } catch (error) {
        console.error("Error processing video:", error);
        setProcessing(false);
        return video.path;
      }
  };


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

          <View className="px-5 pt-4 items-center justify-center">
            <View className="flex-row space-x-4 items-center justify-center h-14">
              <MyPressable
                className={`h-full px-6 bg-gray-500 items-center justify-center rounded-full ${stateSaveImage === "saved" && "bg-gray-400"}`}
                onPress={downloadVideo}
                disabled={
                  stateSaveImage === "saving" || stateSaveImage === "saved"
                }
              >
                {stateSaveImage === "saving" ? (
                  <ActivityIndicator size={28} color={colors.light} />
                ) : stateSaveImage === "saved" ? (
                  <CheckCircle size={28} weight="bold" color={colors.light} />
                ) : (
                  <DownloadSimple
                    size={28}
                    weight="bold"
                    color={colors.light}
                  />
                )}
              </MyPressable>
              {canSend && (
                <MyPressable
                  onPress={send}
                  className="h-16 rounded-full flex-row gap-2 w-52 items-center justify-center"
                  style={{ elevation: 10, ...shadow.purple }}
                >
                  <MyGradient className="rounded-full " />
                  <MyText className="text-base font-bold text-light">
                    {t("camera.send")}
                  </MyText>
                  <ArrowRight size={24} color={colors.light} />
                </MyPressable>
              )}
            </View>
          </View>

        </SafeAreaView>
      </SafeAreaProvider>
    </MyModal>
  );
};

export default VideoPreviewModal;
