import colors from "@config/colors";
import { Plus, X } from "phosphor-react-native";
import { View } from "react-native";
import MyPressable from "./natives/MyPressable";
import MyImage from "./natives/MyImage";

interface ProfilePictureItemProps {
  picture?: string;
  onDelete?: () => void;
  onAdd?: () => void;
}

const ProfilePictureItem = ({ picture }: ProfilePictureItemProps) => {
  return (
    <View className="relative w-32 h-40 border-4 border-gray-300 border-dotted rounded-lg">
      {picture && <MyImage img={picture} resizeMode="cover" />}
      <View className="absolute -bottom-4 left-0 right-0 flex items-center">
        {picture ? (
          <MyPressable
            hapticImpactStyle="medium"
            className="bg-light border  h-7 w-7 rounded-full justify-center items-center"
          >
            <X color={colors.gray[500]} size={16} weight="bold" />
          </MyPressable>
        ) : (
          <MyPressable
            hapticImpactStyle="medium"
            className="bg-purple-100 border border-light h-7 w-7 rounded-full justify-center items-center"
          >
            <Plus color={colors.light} size={16} weight="bold" />
          </MyPressable>
        )}
      </View>
    </View>
  );
};

export default ProfilePictureItem;
