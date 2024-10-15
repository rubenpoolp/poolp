import { useRef, useState } from "react";
import { Button, Text, TouchableOpacity, View } from "react-native";
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from "react-native-vision-camera";
import MyButton from "./natives/MyButton";

const Picture = () => {
  const { hasPermission, requestPermission } = useCameraPermission();
  const [cameraPosition, setCameraPosition] = useState<"front" | "back">(
    "back",
  );
  const device = useCameraDevice(cameraPosition);
  const camera = useRef<Camera>(null);

  if (hasPermission === undefined) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!hasPermission) {
    // Camera permissions are not granted yet
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-lg mb-4 text-center">
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="Grant permission" />
      </View>
    );
  }

  const toggleCameraPosition = () => {
    setCameraPosition((current) => (current === "back" ? "front" : "back"));
  };

  const takePhoto = async () => {
    if (!camera.current) return;
    const photo = await camera.current.takePhoto();
    console.log(photo);
  };

  if (!__DEV__) return null;
  return (
    <>
      {device && (
        <Camera
          ref={camera}
          style={{ flex: 1 }}
          device={device}
          isActive={true}
          photo={true}
        >
          <View className="flex-1 justify-end items-center mb-4">
            <TouchableOpacity
              className="bg-white p-2 rounded-full"
              onPress={toggleCameraPosition}
            >
              <Text className="text-black">Flip Camera</Text>
            </TouchableOpacity>
          </View>
        </Camera>
      )}
      <MyButton
        onPress={takePhoto}
        txt={"DEV Prendre une photo"}
        className="mb-2 w-full"
      />
    </>
  );
};

export default Picture;
