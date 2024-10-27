import MyScreen from "@components/MyScreen";
import MyText from "@components/natives/MyText";
import {
  ArrowsCounterClockwise,
  CameraPlus,
  Flashlight,
  MagnifyingGlassPlus,
} from "phosphor-react-native";
import React, { useCallback, useRef, useState } from "react";
import { Alert, Dimensions, TouchableOpacity, View } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  interpolate,
  useAnimatedProps,
  useSharedValue,
} from "react-native-reanimated";
import {
  Camera,
  CameraPosition,
  useCameraDevice,
  useCameraPermission,
} from "react-native-vision-camera";

const SCREEN_WIDTH = Dimensions.get("window").width;
const ZOOM_LEVELS = [1, 2, 4];

const AnimatedCamera = Animated.createAnimatedComponent(Camera);

const CameraPage = () => {
  const { hasPermission, requestPermission } = useCameraPermission();
  const [cameraPosition, setCameraPosition] = useState<CameraPosition>("back");
  const [flashMode, setFlashMode] = useState<"off" | "on">("off");
  const [currentZoomIndex, setCurrentZoomIndex] = useState(0);

  const camera = useRef<Camera>(null);
  const device = useCameraDevice(cameraPosition);
  const zoom = useSharedValue(0);

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

  // Pinch to zoom gesture
  const pinchGesture = Gesture.Pinch().onUpdate((event) => {
    const newZoom = interpolate(
      event.scale,
      [0.5, 1, 2],
      [
        0,
        ZOOM_LEVELS[currentZoomIndex],
        ZOOM_LEVELS[Math.min(currentZoomIndex + 1, ZOOM_LEVELS.length - 1)],
      ],
    );
    zoom.value = Math.min(Math.max(newZoom, 0), device?.maxZoom || 1);
  });

  const cameraAnimatedProps = useAnimatedProps(() => ({
    zoom: zoom.value,
  }));

  const toggleCameraPosition = useCallback(() => {
    setCameraPosition((current) => (current === "back" ? "front" : "back"));
  }, []);

  const toggleFlash = useCallback(() => {
    setFlashMode((current) => (current === "off" ? "on" : "off"));
  }, []);

  const cycleZoom = useCallback(() => {
    setCurrentZoomIndex((current) => (current + 1) % ZOOM_LEVELS.length);
    zoom.value = ZOOM_LEVELS[(currentZoomIndex + 1) % ZOOM_LEVELS.length];
  }, [currentZoomIndex]);

  if (!hasPermission || !device) {
    return (
      <MyScreen edges={["top"]} className="items-center justify-center">
        <CameraPlus size={48} color="#666" />
        <View className="h-4" />
        <View className="px-8">
          <View className="bg-gray-100 rounded-lg p-4">
            <View className="items-center">
              <CameraPlus size={24} color="#666" />
              <View className="items-center">
                <View className="text-center">
                  {!hasPermission ? (
                    <View className="text-center">
                      <MyText className="text-center ">
                        Camera permission is required to take photos.
                      </MyText>
                      <TouchableOpacity
                        onPress={requestPermission}
                        className="mt-4 bg-blue-500 px-4 py-2 rounded-full"
                      >
                        <MyText className="text-white">Grant Permission</MyText>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <MyText className="text-sm text-gray-600">
                      Unable to access camera device.
                    </MyText>
                  )}
                </View>
              </View>
            </View>
          </View>
        </View>
      </MyScreen>
    );
  }

  return (
    <GestureHandlerRootView className="flex-1 items-center justify-center">
      <MyScreen edges={["top"]} className="flex-1 bg-black">
        <GestureDetector gesture={pinchGesture}>
          <View className="flex-1">
            <AnimatedCamera
              ref={camera}
              device={device}
              isActive={true}
              photo={true}
              enableZoomGesture={false}
              flashMode={flashMode}
              animatedProps={cameraAnimatedProps}
              className="flex-1"
              style={{ width: SCREEN_WIDTH, height: "100%" }}
            />

            {/* Camera Controls Overlay */}
            <View className="absolute top-10 right-4 flex items-end space-y-4">
              <TouchableOpacity
                onPress={toggleCameraPosition}
                className="w-12 h-12 bg-black/50 rounded-full items-center justify-center"
              >
                <ArrowsCounterClockwise size={24} color="white" weight="bold" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={toggleFlash}
                className="w-12 h-12 bg-black/50 rounded-full items-center justify-center"
              >
                <Flashlight
                  size={24}
                  color="white"
                  weight={flashMode === "on" ? "fill" : "bold"}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={cycleZoom}
                className="w-12 h-12 bg-black/50 rounded-full items-center justify-center"
              >
                <View className="items-center">
                  <MagnifyingGlassPlus size={24} color="white" weight="bold" />
                  <View className="text-white text-xs mt-1">
                    {ZOOM_LEVELS[currentZoomIndex]}x
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </GestureDetector>
      </MyScreen>
    </GestureHandlerRootView>
  );
};

export default CameraPage;
