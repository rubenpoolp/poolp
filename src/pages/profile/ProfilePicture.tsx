import assets from "@assets/index";
import MyHeader from "@components/headers/MyHeader";
import MyScreen from "@components/MyScreen";
import MyImage from "@components/natives/MyImage";
import MyText from "@components/natives/MyText";
import ProfilePictureItem from "@components/ProfilePictureItem";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

interface ProfilePictureProps {}

const ProfilePicture = ({}: ProfilePictureProps) => {
  const { t } = useTranslation();

  return (
    <MyScreen padding>
      <MyHeader canGoBack>
        <MyImage img={assets.logoCropped} containerStyle="h-10 w-20" />
      </MyHeader>

      <View className="flex-1 w-full" style={{ gap: 80 }}>
        <MyText className="text-3xl font-semibold mb-5">
          {t("profile.editPictures")}
        </MyText>

        <View className=" space-y-4 w-full items-center">
          <ProfilePictureItem />
          <View className="flex-row w-full justify-evenly">
            <ProfilePictureItem />
            <ProfilePictureItem />
          </View>
        </View>
      </View>
    </MyScreen>
  );
};

export default ProfilePicture;
