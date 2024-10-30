import MyModal from "@components/modals/MyModal";
import MyButton from "@components/natives/MyButton";
import MyPressable from "@components/natives/MyPressable";
import { t } from "i18next";
import { CaretLeft } from "phosphor-react-native";
import React from "react";
import { Image, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface PhotoPreviewModalProps {
  photo: { path: string } | null;
  onRetake: () => void;
  onSend: () => void;
}

const PhotoPreviewModal: React.FC<PhotoPreviewModalProps> = ({
  photo,
  onRetake,
  onSend,
}) => {
  return (
    <MyModal isVisible={!!photo} className="flex-1 bg-background-dark">
      {photo && (
        <Image
          source={{ uri: `file://${photo.path}` }}
          className="flex-1 w-full h-full"
          resizeMode="cover"
        />
      )}
      <SafeAreaView
        edges={["top"]}
        className="absolute flex-1 w-full h-full justify-between pt-16"
      >
        <MyPressable className="ml-5" onPress={onRetake}>
          <CaretLeft />
        </MyPressable>
        <View className="bg-background-dark px-5 items-center pt-4 pb-14">
          <MyButton onPress={onSend} txt={t("send")} />
        </View>
      </SafeAreaView>
    </MyModal>
  );
};

export default PhotoPreviewModal;
