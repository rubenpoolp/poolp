import { MyCamera } from "@components/camera/MyCamera";
import MyScreen from "@components/MyScreen";
import { useCamera } from "@hooks/useCamera";
import useCirclePic from "@hooks/useCirclePic";
import React, { useCallback, useEffect } from "react";
import { View } from "react-native";
import CameraPermissionView from "./components/CameraPermissionView";
import PhotoPreviewModal from "./components/PhotoPreviewModal";

const CameraPage = () => {
  const {
    camera,
    device,
    hasPermission,
    photo,
    flashMode,
    currentZoom,
    initializeCamera,
    toggleCameraPosition,
    toggleFlash,
    cycleZoom,
    takePhoto,
    reset,
  } = useCamera();
  const { uploadPic, isInCircle } = useCirclePic();

  const handleSend = useCallback(
    (uriScreenshot: string) => {
      uploadPic(uriScreenshot);
      reset();
    },
    [reset, uploadPic],
  );

  // Initialize camera permissions
  useEffect(() => {
    initializeCamera();
  }, [initializeCamera]);

  if (!hasPermission || !device) {
    return (
      <CameraPermissionView
        hasPermission={hasPermission}
        onRequestPermission={initializeCamera}
      />
    );
  }

  return (
    <MyScreen
      edges={["top"]}
      className="flex-1 rounded-t-[32px] overflow-hidden"
    >
      <View className="flex-1">
        <MyCamera
          cameraRef={camera}
          device={device}
          isActive={!photo}
          zoom={currentZoom}
          flashMode={flashMode}
          currentZoom={currentZoom}
          onToggleCameraPosition={toggleCameraPosition}
          onToggleFlash={toggleFlash}
          onCycleZoom={cycleZoom}
          onTakePhoto={takePhoto}
        />
        <PhotoPreviewModal
          photo={photo}
          onRetake={reset}
          onSend={handleSend}
          canSend={isInCircle}
        />
      </View>
    </MyScreen>
  );
};

export default CameraPage;
