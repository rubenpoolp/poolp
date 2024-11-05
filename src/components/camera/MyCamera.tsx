import React from "react";
import { Dimensions, View } from "react-native";
import { Camera } from "react-native-vision-camera";
import CameraControls from "../../pages/takePicture/components/CameraControls";

const SCREEN_WIDTH = Dimensions.get("window").width;

interface MyCameraProps {
  cameraRef: React.RefObject<Camera>;
  device: any;
  isActive: boolean;
  zoom: number;
  flashMode: "off" | "on";
  currentZoom: number;
  onToggleCameraPosition: () => void;
  onToggleFlash: () => void;
  onCycleZoom: () => void;
  onTakePhoto: () => void;
}

export const MyCamera: React.FC<MyCameraProps> = ({
  cameraRef,
  device,
  isActive,
  zoom,
  flashMode,
  currentZoom,
  onToggleCameraPosition,
  onToggleFlash,
  onCycleZoom,
  onTakePhoto,
}) => {
  return (
    <View className="flex-1">
      <Camera
        ref={cameraRef}
        device={device}
        isActive={isActive}
        photo
        zoom={zoom}
        style={{ width: SCREEN_WIDTH, height: "100%" }}
      />

      <CameraControls
        onToggleCameraPosition={onToggleCameraPosition}
        onToggleFlash={onToggleFlash}
        onCycleZoom={onCycleZoom}
        flashMode={flashMode}
        currentZoom={currentZoom}
        takePhoto={onTakePhoto}
      />
    </View>
  );
};
