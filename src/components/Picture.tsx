import { CameraView, useCameraPermissions } from "expo-camera";
import { useRef, useState } from "react";
import { Button, Text, TouchableOpacity, View } from "react-native";
import MyButton from "./natives/MyButton";

const Picture = () => {
  const cameraRef = useRef<CameraView>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<"front" | "back">("back");

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-lg mb-4 text-center">
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="Grant permission" />
      </View>
    );
  }

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };
  const takePhoto = () => {
    cameraRef.current?.takePictureAsync();
  };

  if (!__DEV__) return null;
  return (
    <>
      <CameraView className="flex-1" facing={facing}>
        <View className="flex-1 justify-end items-center mb-4">
          <TouchableOpacity
            className="bg-white p-2 rounded-full"
            onPress={toggleCameraFacing}
          >
            <Text className="text-black">Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
      <MyButton
        onPress={takePhoto}
        txt={"DEV Prendre une photo"}
        className="mb-2 w-full"
      />
    </>
  );
};

export default Picture;
