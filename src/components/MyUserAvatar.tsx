import useGetProfilePics from "@api/profilePics/getProfilePics.hook";
import { useAuth } from "@context/Auth";
import { useNavigation } from "@react-navigation/native";
import { getProfilePicsStorageUrl } from "@utils/getStorageUrl";
import { useEffect, useState } from "react";
import Avatar from "./Avatar";

const MyUserAvatar = ({
  disabled,
  size,
}: {
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
}) => {
  const auth = useAuth();
  const navigation = useNavigation();
  const { data: profilePics } = useGetProfilePics();
  const [profilePic, setProfilePic] = useState<string | null>(null);

  console.log(profilePic);
  useEffect(() => {
    const profilePic =
      profilePics && profilePics.length > 0 ? profilePics[0] : null;
    if (!profilePic) {
      setProfilePic(null);
      return;
    }

    getProfilePicsStorageUrl(profilePic).then((url) => {
      console.log("My User Avatar url", url);
      setProfilePic(url);
    });
  }, [profilePic, profilePics]);

  const goToProfile = () => navigation.navigate("Profile" as never);

  return (
    <Avatar
      onPress={disabled ? undefined : goToProfile}
      picture={profilePic || undefined}
      username={auth.user?.name}
      size={size}
    />
  );
};

export default MyUserAvatar;
