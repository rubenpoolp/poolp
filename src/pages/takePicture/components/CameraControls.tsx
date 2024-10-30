import MyPressable from "@components/natives/MyPressable";
import MyText from "@components/natives/MyText";
import { ArrowsClockwise, Lightning } from "phosphor-react-native";
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
      <View className="flex items-end space-y-6">
        <MyPressable
          onPress={onToggleFlash}
          className="w-9 h-9 rounded-full items-center justify-center"
        >
          <Lightning
            color="white"
            size={30}
            weight={flashMode === "on" ? "fill" : "regular"}
          />
        </MyPressable>
        <MyPressable
          onPress={onCycleZoom}
          className="border border-light rounded-full items-center justify-center w-9 h-9"
        >
          <MyText className="text-light">x{currentZoom}</MyText>
        </MyPressable>
        <MyPressable
          onPress={onToggleCameraPosition}
          className="w-9 h-9 rounded-full items-center justify-center"
        >
          <ArrowsClockwise size={30} color="white" />
        </MyPressable>
      </View>
      <View className="flex-row justify-center items-center">
        <ShutterButton onPress={takePhoto} />
      </View>
    </View>
  );
};

export default CameraControls;
