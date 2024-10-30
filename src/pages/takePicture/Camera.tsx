import MyScreen from "@components/MyScreen";
import React, { useCallback, useRef, useState } from "react";
import { Alert, Dimensions, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  Camera,
  CameraPosition,
  CameraRuntimeError,
  useCameraDevice,
  useCameraPermission,
} from "react-native-vision-camera";
import CameraControls from "./components/CameraControls";
import CameraPermissionView from "./components/CameraPermissionView";
import PhotoPreviewModal from "./components/PhotoPreviewModal";

const SCREEN_WIDTH = Dimensions.get("window").width;
const ZOOM_LEVELS = [1, 2, 4];

const CameraPage = () => {
  const { hasPermission, requestPermission } = useCameraPermission();
  const [cameraPosition, setCameraPosition] = useState<CameraPosition>("back");
  const [flashMode, setFlashMode] = useState<"off" | "on">("off");
  const [currentZoom, setCurrentZoom] = useState(ZOOM_LEVELS[0]);
  const [photo, setPhoto] = useState<{ path: string } | null>(null);

  const camera = useRef<Camera>(null);
  const device = useCameraDevice(cameraPosition);

  // Request camera permission if not granted
  React.useEffect(() => {
    if (!hasPermission) {
      requestPermission().catch(() => {
        Alert.alert(
          "Camera Permission",
          "Please enable camera access in your device settings to use this feature.",
        );
      });
    }
  }, [hasPermission, requestPermission]);

  const toggleCameraPosition = useCallback(() => {
    setCameraPosition((current) => (current === "back" ? "front" : "back"));
    setCurrentZoom(ZOOM_LEVELS[0]);
  }, []);

  const toggleFlash = useCallback(() => {
    setFlashMode((current) => (current === "off" ? "on" : "off"));
  }, []);

  const cycleZoom = useCallback(() => {
    setCurrentZoom((current) => {
      const currentIndex = ZOOM_LEVELS.indexOf(current);
      const nextIndex = (currentIndex + 1) % ZOOM_LEVELS.length;
      return ZOOM_LEVELS[nextIndex];
    });
  }, []);

  const takePhoto = useCallback(async () => {
    try {
      if (camera.current) {
        const photo = await camera.current.takePhoto({
          flash: flashMode,
          enableAutoRedEyeReduction: true,
        });
        setPhoto(photo);
      }
    } catch (e) {
      if (e instanceof CameraRuntimeError) {
        console.error("Camera error:", e);
      }
    }
  }, [flashMode]);

  const handleRetake = useCallback(() => {
    setPhoto(null);
  }, []);

  const handleSend = useCallback(() => {
    // Handle sending the photo
    // console.log("Sending photo:", photo);
    setPhoto(null);
  }, [photo]);

  if (!hasPermission || !device) {
    return (
      <CameraPermissionView
        hasPermission={hasPermission}
        onRequestPermission={requestPermission}
      />
    );
  }

  return (
    <MyScreen edges={["top"]} className="flex-1 bg-black">
      <SafeAreaProvider>
        <View className="flex-1">
          <Camera
            ref={camera}
            device={device}
            isActive={!photo}
            photo
            zoom={currentZoom}
            className="flex-1"
            style={{ width: SCREEN_WIDTH, height: "100%" }}
          />

          <CameraControls
            onToggleCameraPosition={toggleCameraPosition}
            onToggleFlash={toggleFlash}
            onCycleZoom={cycleZoom}
            flashMode={flashMode}
            currentZoom={currentZoom}
            takePhoto={takePhoto}
          />

          <PhotoPreviewModal
            photo={photo}
            onRetake={handleRetake}
            onSend={handleSend}
          />
        </View>
      </SafeAreaProvider>
    </MyScreen>
  );
};

export default CameraPage;
