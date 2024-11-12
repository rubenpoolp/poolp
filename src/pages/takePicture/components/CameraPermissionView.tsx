import MyScreen from "@components/MyScreen";
import MyButton from "@components/natives/MyButton";
import MyPressable from "@components/natives/MyPressable";
import MyText from "@components/natives/MyText";
import { light } from "@config/colors";
import { CameraPlus } from "phosphor-react-native";
import React from "react";
import { Linking, View } from "react-native";
import ShutterButton from "./ShutterButton";

interface CameraPermissionViewProps {
  onRequestPermission: () => void;
  hasPermission: boolean;
}

const CameraPermissionView: React.FC<CameraPermissionViewProps> = ({
  onRequestPermission,
  hasPermission,
}) => {
  const openSettings = () => {
    Linking.openSettings();
  };

  return (
    <MyScreen edges={["top"]} className="items-center justify-center">
      <View className="h-4" />
      <View className="px-8">
        <View className="rounded-lg p-4">
          <View className="items-center">
            <CameraPlus size={40} color={light} />
            <View className="items-center">
              <View className="text-center">
                {!hasPermission ? (
                  <View className="text-center">
                    <MyText className="text-center">
                      Camera permission is required to take photos.
                    </MyText>
                    <MyPressable
                      onPress={onRequestPermission}
                      className="mt-4 px-4 py-2 rounded-full"
                    >
                      <MyText className="text-white">Grant Permission</MyText>
                    </MyPressable>
                  </View>
                ) : (
                  <View className="items-center w-full">
                    <MyText className="text-sm text-light mt-1 mb-2">
                      Unable to access camera device.
                    </MyText>
                    <MyButton txt="Open Settings" onPress={openSettings} />
                  </View>
                )}
                <ShutterButton
                  onPressPicture={() => console.log("pic")}
                  onHoldVideo={() => console.log("video")}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </MyScreen>
  );
};

export default CameraPermissionView;
