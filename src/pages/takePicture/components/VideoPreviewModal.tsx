import MyModal from "@components/modals/MyModal";
import MyGradient from "@components/MyGradient";
import MyPressable from "@components/natives/MyPressable";
import MyText from "@components/natives/MyText";
import colors, { purple } from "@config/colors";
import shadow from "@config/shadow";
import {
  generateFFmpegParams,
  videoProcessingConfig,
} from "@config/videoProcessing";
import { useIsLoading } from "@context/IsLoading";
import { useVideoPlayer } from "@context/VideoPlayerContext";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { FFmpegKit } from "ffmpeg-kit-react-native";
import {
  ArrowRight,
  CaretLeft,
  CheckCircle,
  DownloadSimple,
} from "phosphor-react-native";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  Alert,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { captureRef } from "react-native-view-shot";
import SnapTexts from "./SnapTexts";
import FinalVideoPlayer from "./VideoPlayer";

interface VideoProps {
  video: { path: string; external: boolean } | null;
  onRetake: () => void;
  onSend: (uri: string) => void;
  canSend: boolean;
}

const VideoPreviewModal = ({
  video,
  onRetake,
  onSend,
  canSend,
}: VideoProps) => {
  const { t } = useTranslation();
  const videoAndTextRef = useRef<View>(null);

  const { isLoading } = useVideoPlayer();
  const [stateSaveImage, setStateSaveImage] = useState<
    "saving" | "saved" | "error" | null
  >(null);
  const { isLoading: globalIsLoading, setIsLoading } = useIsLoading();
  const { width, height } = useWindowDimensions();
  const heightVideo = height - 100;

  const send = async () => {
    if (!video) return;

    const localUri = video.path;

    const localUriWithSnapTexts = await addSnapTextsToVideo();
    console.log("localUriWithSnapTexts", localUriWithSnapTexts);

    onSend(localUriWithSnapTexts || localUri);
  };

  const downloadVideo = async () => {
    if (!video) return;

    const localUri = video.path;

    const localUriWithSnapTexts = await addSnapTextsToVideo();

    await MediaLibrary.saveToLibraryAsync(localUriWithSnapTexts).catch(
      async () => {
        return await MediaLibrary.saveToLibraryAsync(localUri).catch(
          (error) => {
            Alert.alert("Error saving video");
            console.log("ERROR SAVING VIDEO", localUriWithSnapTexts, error);
            setStateSaveImage("error");
            return null;
          },
        );
      },
    );

    setStateSaveImage("saved");
    setTimeout(() => {
      setStateSaveImage(null);
    }, 2000);
  };

  const addSnapTextsToVideo = async () => {
    if (!video) return "";
    if (!videoAndTextRef.current) return "";
    const stringConfig = generateFFmpegParams();
    const config = videoProcessingConfig;
    console.log("STRING CONFIG", stringConfig);
    console.log("CONFIG", config);
    setIsLoading(true);
    try {
      const widthOverlay = width - 30;
      const heightOverlay = heightVideo - 100;
      // Capture the overlay view as base64 with configured quality
      const overlayBase64 = await captureRef(videoAndTextRef, {
        format: config.overlayFormat,
        quality: config.overlayQuality,
        width: widthOverlay,
        height: heightOverlay,
        result: "base64",
      });

      // Write base64 to file
      const overlayPath = `${FileSystem.cacheDirectory}overlay.${config.overlayFormat}`;
      await FileSystem.writeAsStringAsync(overlayPath, overlayBase64, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // Create output path with configured format
      const outputPath = `${FileSystem.cacheDirectory}${Date.now()}.${config.outputFormat}`;

      // Use FFmpeg to combine video with overlay, applying quality settings overwrite
      // const command = `-i "${video.path}" -i "${overlayPath}" -filter_complex "[1:v]scale=w=iw:h=ih[overlay];[0:v][overlay]overlay=0:0" -c:a copy "${outputPath}" -y`;
      const command = `-i "${video.path}" -i "${overlayPath}" ${stringConfig} -filter_complex "[1:v]scale=w=${widthOverlay * 3}:h=${heightOverlay * 3}[overlay];[0:v][overlay]overlay=0:0" -c:a copy "${outputPath}"`;

      const session = await FFmpegKit.execute(command);
      const returnCode = await session.getReturnCode();

      if (returnCode.isValueError()) {
        console.error(
          "Error processing video:",
          await session.getLogsAsString(),
        );
        throw new Error("FFmpeg processing failed");
      }

      // Clean up temporary overlay file
      await FileSystem.deleteAsync(overlayPath, { idempotent: true });

      setIsLoading(false);
      return outputPath;
    } catch (error) {
      console.error("Error processing video:", error);
      setIsLoading(false);
      return "";
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
            {(isLoading || globalIsLoading) && (
              <ActivityIndicator
                color={purple[100]}
                size="large"
                className="absolute top-0 bottom-0 self-center z-10"
              />
            )}

            {video && (
              <View
                ref={videoAndTextRef}
                className={`flex-1 ${isLoading || globalIsLoading ? "opacity-20" : ""}`}
              >
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
                  stateSaveImage === "saving" ||
                  stateSaveImage === "saved" ||
                  isLoading ||
                  globalIsLoading
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
                  disabled={isLoading || globalIsLoading}
                  onPress={send}
                  className="h-16 rounded-full flex-row gap-2 w-52 items-center justify-center"
                  style={shadow.purple}
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
