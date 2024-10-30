import MyScreen from "@components/MyScreen";
import MyPressable from "@components/natives/MyPressable";
import MyText from "@components/natives/MyText";
import { CameraPlus } from "phosphor-react-native";
import React from "react";
import { View } from "react-native";

interface CameraPermissionViewProps {
  onRequestPermission: () => void;
  hasPermission: boolean;
}

const CameraPermissionView: React.FC<CameraPermissionViewProps> = ({
  onRequestPermission,
  hasPermission,
}) => {
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
                    <MyText className="text-center">
                      Camera permission is required to take photos.
                    </MyText>
                    <MyPressable
                      onPress={onRequestPermission}
                      className="mt-4 bg-blue-500 px-4 py-2 rounded-full"
                    >
                      <MyText className="text-white">Grant Permission</MyText>
                    </MyPressable>
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
};

export default CameraPermissionView;
