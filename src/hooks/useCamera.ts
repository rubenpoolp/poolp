import { useCallback, useRef, useState } from "react";
import { Alert } from "react-native";
import {
  Camera,
  CameraPosition,
  CameraRuntimeError,
  useCameraDevice,
  useCameraPermission,
  VideoFile,
} from "react-native-vision-camera";

const ZOOM_LEVELS = [1, 2, 4];

export const useCamera = () => {
  const { hasPermission, requestPermission } = useCameraPermission();
  const [cameraPosition, setCameraPosition] = useState<CameraPosition>("back");
  const [flashMode, setFlashMode] = useState<"off" | "on">("off");
  const [currentZoom, setCurrentZoom] = useState(ZOOM_LEVELS[0]);
  const [photo, setPhoto] = useState<{ path: string } | null>(null);
  const [video, setVideo] = useState<VideoFile | null>(null);
  const camera = useRef<Camera>(null);
  const device = useCameraDevice(cameraPosition);

  // Request camera permission if not granted
  const initializeCamera = useCallback(() => {
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

  const onEndTakeVideo = useCallback(async () => {
    await camera.current?.stopRecording();
    console.log("onEndTakeVideo");
    // setVideo(null);
  }, []);

  const onTakeVideo = useCallback(() => {
    try {
      if (camera.current) {
        camera.current.startRecording({
          flash: flashMode,
          onRecordingError: (error) => {
            console.error("Camera error:", error);
          },
          onRecordingFinished: (video) => {
            console.log("Video recorded:", video);
            setVideo(video);
          },
        });
      }
    } catch (e) {
      if (e instanceof CameraRuntimeError) {
        console.error("Camera error:", e);
      }
    }
  }, [flashMode]);

  const reset = useCallback(() => {
    setPhoto(null);
  }, []);

  return {
    camera,
    device,
    hasPermission,
    cameraPosition,
    flashMode,
    currentZoom,
    photo,
    video,
    initializeCamera,
    toggleCameraPosition,
    toggleFlash,
    cycleZoom,
    takePhoto,
    onEndTakeVideo,
    onTakeVideo,
    reset,
  };
};
