import { CaretUp, DotsThree, X } from "phosphor-react-native";
import { ImageProps, Pressable, SafeAreaView, View } from "react-native";
import StoryBarLoader from "./animations/StoriesBarLoader";
import MyPressable from "./natives/MyPressable";
import MyText from "./natives/MyText";

interface OverlayStoryModalProps {
  onClose: () => void;
  stories: { img: ImageProps["source"] }[];
  actualIndex: number;
  duration: number;
  onLeft: () => void;
  onRight: () => void;
  firstName: string;
}

const OverlayStoryModal = ({
  onClose,
  stories,
  actualIndex,
  duration,
  onLeft,
  onRight,
  firstName,
}: OverlayStoryModalProps) => {
  return (
    <SafeAreaView className="absolute flex-1 w-full h-full">
      <View className="absolute w-full flex-1 h-4/5 bottom-28 justify-end flex-row z-10">
        <Pressable className="flex-1 " onPress={onLeft} />
        <Pressable className="flex-1" onPress={onRight} />
      </View>
      <View className="flex-1 px-4 justify-between">
        <View className="space-y-4">
          <StoryBarLoader
            index={actualIndex}
            duration={duration}
            total={stories.length}
          />
          <View className="self-end mr-2 flex-row space-x-2">
            <MyPressable onPress={onClose}>
              <DotsThree />
            </MyPressable>
            <MyPressable onPress={onClose}>
              <X />
            </MyPressable>
          </View>
        </View>
        <View>
          <MyText className="text-3xl font-semibold mb-4">{firstName}</MyText>

          <MyPressable onPress={onClose}>
            <View className="self-center">
              <CaretUp size={28} />
            </View>
          </MyPressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OverlayStoryModal;
