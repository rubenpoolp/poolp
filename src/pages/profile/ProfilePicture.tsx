import assets from "@assets/index";
import MyHeader from "@components/headers/MyHeader";
import MyScreen from "@components/MyScreen";
import MyImage from "@components/natives/MyImage";
import { useTranslation } from "react-i18next";
import ProfilePictureContent from "./ProfilePictureContent";

interface ProfilePictureProps {}

const ProfilePicture = ({}: ProfilePictureProps) => {
  const { t } = useTranslation();

  return (
    <MyScreen padding>
      <MyHeader canGoBack>
        <MyImage img={assets.logoCropped} containerStyle="h-10 w-20" />
      </MyHeader>
      <ProfilePictureContent title={t("profile.editPictures")} />
    </MyScreen>
  );
};

export default ProfilePicture;
