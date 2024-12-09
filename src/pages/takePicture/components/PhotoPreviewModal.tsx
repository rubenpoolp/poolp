import MyModal from "@components/modals/MyModal";
import MyGradient from "@components/MyGradient";
import MyPressable from "@components/natives/MyPressable";
import MyText from "@components/natives/MyText";
import colors from "@config/colors";
import shadow from "@config/shadow";
import * as MediaLibrary from "expo-media-library";
import { t } from "i18next";
import { ArrowRight, CaretLeft, DownloadSimple } from "phosphor-react-native";
import React, { useRef } from "react";
import { Image, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { captureRef } from "react-native-view-shot";
import SnapTexts from "./SnapTexts";

interface PhotoPreviewModalProps {
  photo: { path: string } | null;
  onRetake: () => void;
  onSend: (uriScreenshot: string) => void;
  canSend: boolean;
}

const PhotoPreviewModal: React.FC<PhotoPreviewModalProps> = ({
  photo,
  onRetake,
  onSend,
  canSend,
}) => {
  const imageAndTextRef = useRef<View>(null);

  const getLocalUriWithSnapTexts = async () => {
    let localUri = "";
    // for video
    if (photo?.path.endsWith(".mp4")) {
      console.log("tamer");
    } else {
      localUri = await captureRef(imageAndTextRef, {
        quality: 0.5,
        format: "jpg",
      });
    }

    return localUri;
  };

  const onSaveImage = async () => {
    if (!photo) return;

    const localUri = await getLocalUriWithSnapTexts();

    onSend(localUri);
  };

  const downloadImage = async () => {
    if (!photo) return;

    const localUri = await getLocalUriWithSnapTexts();

    console.log("downloading image", photo.path);
    // download image on device expo camera roll
    await MediaLibrary.saveToLibraryAsync(localUri);
  };

  return (
    <MyModal
      showAfterMs={0}
      animationInTiming={5}
      animationOutTiming={5}
      isVisible={!!photo}
      className="flex-1 bg-background-dark"
    >
      <SafeAreaProvider className="flex-1 w-full h-full">
        <SafeAreaView
          edges={["top", "bottom"]}
          className="flex-1 w-full h-full justify-between"
        >
          <View className="flex-1">
            {photo && (
              <View ref={imageAndTextRef} className="flex-1 ">
                <Image
                  source={{ uri: `file://${photo.path}` }}
                  className="w-full h-full rounded-t-[32px]"
                  resizeMode="cover"
                />
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
                className="h-full px-6 bg-gray-500 items-center justify-center rounded-full"
                onPress={downloadImage}
              >
                <DownloadSimple size={28} weight="bold" color={colors.light} />
              </MyPressable>
              {canSend && (
                <MyPressable
                  onPress={onSaveImage}
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

export default PhotoPreviewModal;
