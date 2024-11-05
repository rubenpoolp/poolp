import MyScreen from "@components/MyScreen";
import MyButton from "@components/natives/MyButton";
import MyPressable from "@components/natives/MyPressable";
import MyText from "@components/natives/MyText";
import { light } from "@config/colors";
import { CameraPlus } from "phosphor-react-native";
import React, { useState } from "react";
import { Linking, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

interface CameraPermissionViewProps {
  onRequestPermission: () => void;
  hasPermission: boolean;
}

type TextStory = {
  text: string;
  position: { y: number };
};

const CameraPermissionView: React.FC<CameraPermissionViewProps> = ({
  onRequestPermission,
  hasPermission,
}) => {
  const [textStories, setTextStories] = useState<TextStory[]>([]);

  const openSettings = () => {
    Linking.openSettings();
  };
  const newTextStory = () => {
    console.log("new text story");
    setTextStories([...textStories, { text: "Hello", position: { y: 0 } }]);
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
                    <MyPressable
                      opacity={1}
                      className="bg-red h-10 w-10"
                      onPress={newTextStory}
                    />
                    {textStories.map((textStory, index) => (
                      <TextInput
                        autoFocus
                        key={index}
                        className="text-sm text-light w-full text-center bg-red"
                      >
                        {textStory.text}
                      </TextInput>
                    ))}
                    <MyText className="text-sm text-light mt-1 mb-2">
                      Unable to access camera device.
                    </MyText>
                    <MyButton txt="Open Settings" onPress={openSettings} />
                  </View>
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
