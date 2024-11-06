import MyModal from "@components/modals/MyModal";
import MyButton from "@components/natives/MyButton";
import MyPressable from "@components/natives/MyPressable";
import { t } from "i18next";
import { CaretLeft } from "phosphor-react-native";
import React, { useRef } from "react";
import { Image, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
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
      {photo && (
        <View ref={imageAndTextRef} className="w-full h-full">
          <Image
            source={{ uri: `file://${photo.path}` }}
            className="w-full h-full"
            resizeMode="cover"
          />
          <SnapTexts />
        </View>
      )}
      <SafeAreaView edges={["top"]} className="absolute w-full top-0 pt-16">
        <MyPressable className="ml-5" onPress={onRetake}>
          <CaretLeft />
        </MyPressable>
      </SafeAreaView>

      <SafeAreaView className="absolute w-full bottom-0 bg-background-dark px-5 items-center pt-4 pb-14">
        <MyButton onPress={onSaveImage} txt={t("camera.send")} />
      </SafeAreaView>
    </MyModal>
  );
};

export default PhotoPreviewModal;
