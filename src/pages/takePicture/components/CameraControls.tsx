import MyPressable from "@components/natives/MyPressable";
import MyText from "@components/natives/MyText";
import { ArrowsCounterClockwise, Flashlight } from "phosphor-react-native";
import React from "react";
import { View } from "react-native";
import ShutterButton from "./ShutterButton";

interface CameraControlsProps {
  onToggleCameraPosition: () => void;
  onToggleFlash: () => void;
  onCycleZoom: () => void;
  flashMode: "off" | "on";
  currentZoom: number;
  takePhoto: () => void;
}

const CameraControls: React.FC<CameraControlsProps> = ({
  onToggleCameraPosition,
  onToggleFlash,
  onCycleZoom,
  flashMode,
  currentZoom,
  takePhoto,
}) => {
  return (
    <View className="absolute w-full h-full flex-1 p-5 justify-between">
      <View className="flex items-end space-y-4">
        <MyPressable
          onPress={onToggleFlash}
          className="w-12 h-12 rounded-full items-center justify-center"
        >
          <Flashlight
            color="white"
            weight={flashMode === "on" ? "fill" : "regular"}
          />
        </MyPressable>
      </View>
      <View className="flex-row justify-between items-center">
        <MyPressable
          onPress={onCycleZoom}
          className="border border-light rounded-full items-center justify-center mr-4 w-10 h-10"
        >
          <MyText className="text-light">{currentZoom}x</MyText>
        </MyPressable>

        <ShutterButton onPress={takePhoto} />

        <MyPressable
          onPress={onToggleCameraPosition}
          className="rounded-full items-center justify-center ml-4 bg-overlay/50 p-2"
        >
          <ArrowsCounterClockwise color="white" />
        </MyPressable>
      </View>
    </View>
  );
};

export default CameraControls;
