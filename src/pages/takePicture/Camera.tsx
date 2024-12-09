import { MyCamera } from "@components/camera/MyCamera";
import MyScreen from "@components/MyScreen";

import { useCamera } from "@hooks/useCamera";
import useCirclePic from "@hooks/useCirclePic";
import React, { useCallback, useEffect } from "react";
import { View } from "react-native";
import CameraPermissionView from "./components/CameraPermissionView";
import PhotoPreviewModal from "./components/PhotoPreviewModal";
import VideoPreviewModal from "./components/VideoPreviewModal";
import useCircleVideo from "@hooks/useCircleVideo";

const CameraPage = () => {
  const {
    camera,
    device,
    hasPermission,
    photo,
    video,
    flashMode,
    currentZoom,
    initializeCamera,
    toggleCameraPosition,
    toggleFlash,
    cycleZoom,
    takePhoto,
    onTakeVideo,
    onEndTakeVideo,
    reset,
  } = useCamera();
  const { uploadPic, isInCircle } = useCirclePic();
  const { uploadVid } = useCircleVideo();

  const handleSend = useCallback(
    (uriScreenshot: string) => {
      uploadPic(uriScreenshot);
      reset();
    },
    [reset, uploadPic],
  );

  const handleSendVideo = useCallback(
    (uri: string) => {
      uploadVid(uri);
      reset();
    },
    [reset, uploadVid],
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
          onTakeVideo={onTakeVideo}
          onEndTakeVideo={onEndTakeVideo}
          />
        <PhotoPreviewModal
          photo={photo}
          onRetake={reset}
          onSend={handleSend}
          canSend={isInCircle}
        />
        <VideoPreviewModal video={video} onRetake={reset} onSend={handleSendVideo}/>
      </View>
    </MyScreen>
  );
};

export default CameraPage;
