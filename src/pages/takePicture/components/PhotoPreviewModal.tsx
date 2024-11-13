import MyModal from "@components/modals/MyModal";
import MyButton from "@components/natives/MyButton";
import MyPressable from "@components/natives/MyPressable";
import { t } from "i18next";
import { CaretLeft } from "phosphor-react-native";
import React, { useRef } from "react";
import { Image, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { captureRef } from "react-native-view-shot";
import SnapTexts from "./SnapTexts";

interface PhotoPreviewModalProps {
  photo: { path: string } | null;
  onRetake: () => void;
  onSend: (uriScreenshot: string) => void;
}

const PhotoPreviewModal: React.FC<PhotoPreviewModalProps> = ({
  photo,
  onRetake,
  onSend,
}) => {
  const imageAndTextRef = useRef<View>(null);

  const onSaveImage = async () => {
    if (!photo) return;

    const localUri = await captureRef(imageAndTextRef, {
      quality: 0.5,
      format: "jpg",
    });

    onSend(localUri);
  };

  return (
    <MyModal isVisible={!!photo} className="flex-1 bg-background-dark">
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

          <View className="w-full px-5 items-center pt-4">
            <MyButton onPress={onSaveImage} txt={t("camera.send")} />
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </MyModal>
  );
};

export default PhotoPreviewModal;
