import MyPressable from "@components/natives/MyPressable";
import { X } from "phosphor-react-native";
import React, { FC, useEffect } from "react";
import { SafeAreaView, View } from "react-native";
import { useCamera } from "../../hooks/useCamera";
import { MyCamera } from "../camera/MyCamera";
import MyModal from "./MyModal";

interface CameraModalProps {
  isVisible: boolean;
  onClose: () => void;
  onCapture: (uri: string) => void;
}

const CameraModal: FC<CameraModalProps> = ({
  isVisible,
  onClose,
  onCapture,
}) => {
  const {
    camera,
    device,
    hasPermission,
    flashMode,
    currentZoom,
    initializeCamera,
    toggleCameraPosition,
    toggleFlash,
    cycleZoom,
    takePhoto,
  } = useCamera();

  useEffect(() => {
    if (isVisible) {
      initializeCamera();
    }
  }, [isVisible, initializeCamera]);

  const handleTakePhoto = () => {
    takePhoto().then((photo) => {
      if (photo) {
        onCapture(photo.path);
        onClose();
      }
    });
  };

  if (!hasPermission || !device) {
    return null;
  }

  return (
    <MyModal
      isVisible={isVisible}
      onBackdropPress={onClose}
      backdropOpacity={0.7}
      style={{ margin: 0 }}
    >
      <SafeAreaView className="w-full h-full bg-tabBar-background">
        <View className="absolute top-[68] left-4 z-10">
          <MyPressable onPress={onClose} hitSlop={20}>
            <X />
          </MyPressable>
        </View>
        <MyCamera
          cameraRef={camera}
          device={device}
          isActive={isVisible}
          zoom={currentZoom}
          flashMode={flashMode}
          currentZoom={currentZoom}
          onToggleCameraPosition={toggleCameraPosition}
          onToggleFlash={toggleFlash}
          onCycleZoom={cycleZoom}
          onTakePhoto={handleTakePhoto}
        />
      </SafeAreaView>
    </MyModal>
  );
};

export default CameraModal;
