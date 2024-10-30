import MyScreen from "@components/MyScreen";
import MyText from "@components/natives/MyText";
import {
  ArrowsCounterClockwise,
  CameraPlus,
  Check,
  Flashlight,
  MagnifyingGlassPlus,
  X,
} from "phosphor-react-native";
import React, { useCallback, useRef, useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  Modal,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Camera,
  CameraPosition,
  CameraRuntimeError,
  useCameraDevice,
  useCameraPermission,
} from "react-native-vision-camera";

const SCREEN_WIDTH = Dimensions.get("window").width;
const ZOOM_LEVELS = [1, 2, 4];
const SHUTTER_BUTTON_BORDER_COLOR = "rgba(255, 255, 255, 0.5)";

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
    console.log("Sending photo:", photo);
    setPhoto(null);
  }, [photo]);

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
    <MyScreen edges={["top"]} className="flex-1 bg-black">
      <View className="flex-1">
        <Camera
          ref={camera}
          device={device}
          isActive={!photo}
          photo={true}
          zoom={currentZoom}
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
                <MyText>{currentZoom}x</MyText>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Shutter Button */}
        <View className="absolute bottom-10 left-0 right-0 items-center">
          <TouchableOpacity
            onPress={takePhoto}
            className="w-20 h-20 bg-white rounded-full items-center justify-center"
            style={{
              borderWidth: 4,
              borderColor: SHUTTER_BUTTON_BORDER_COLOR,
            }}
          >
            <View className="w-16 h-16 bg-white rounded-full" />
          </TouchableOpacity>
        </View>

        {/* Photo Preview Modal */}
        <Modal visible={!!photo} transparent={true} animationType="slide">
          <View className="flex-1 bg-black">
            {photo && (
              <Image
                source={{ uri: `file://${photo.path}` }}
                className="flex-1"
                resizeMode="contain"
              />
            )}
            <View className="absolute bottom-10 left-0 right-0 flex-row justify-center space-x-8">
              <TouchableOpacity
                onPress={handleRetake}
                className="w-16 h-16 bg-red-500 rounded-full items-center justify-center"
              >
                <X size={32} color="white" weight="bold" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleSend}
                className="w-16 h-16 bg-green-500 rounded-full items-center justify-center"
              >
                <Check size={32} color="white" weight="bold" />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </MyScreen>
  );
};

export default CameraPage;
