import assets from "@assets/index";
import MyHeader from "@components/headers/MyHeader";
import MyScreen from "@components/MyScreen";
import ProfilePictureItem from "@components/ProfilePictureItem";
import { View } from "react-native";

interface ProfilePictureProps {}

const ProfilePicture = ({}: ProfilePictureProps) => {
  return (
    <MyScreen padding>
      <MyHeader canGoBack />
      <View className="flex-1 space-y-4 w-full items-center">
        <ProfilePictureItem picture={assets.test1} />
        <View className="flex-row w-full justify-evenly">
          <ProfilePictureItem />
          <ProfilePictureItem />
        </View>
      </View>
    </MyScreen>
  );
};

export default ProfilePicture;
