import useGetProfilePics from "@api/profilePics/getProfilePics.hook";
import assets from "@assets/index";
import { useAuth } from "@context/Auth";
import { useNavigation } from "@react-navigation/native";
import { supabase } from "@utils/supabase";
import { useEffect, useState } from "react";
import { Bump } from "./animations/Bump";
import MyImage from "./natives/MyImage";
import MyPressable from "./natives/MyPressable";
import MyText from "./natives/MyText";

const Avatar = ({
  disabled = false,
  size = "md",
}: {
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
}) => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const letter = user ? user.name.charAt(0) : "";
  const { data: profilePics } = useGetProfilePics(user?.id);
  const [profilePic, setProfilePic] = useState<string | null>(null);

  useEffect(() => {
    const profilePic =
      profilePics && profilePics.length > 0 ? profilePics[0] : null;
    if (!profilePic) {
      setProfilePic(null);
      return;
    }

    const { data } = supabase.storage
      .from("profilePics")
      .getPublicUrl(profilePic);
    setProfilePic(data?.publicUrl);
  }, [profilePics]);

  let sizeClass = "";
  let textSizeClass = "";
  if (size === "sm") {
    sizeClass = "w-6 h-6";
    textSizeClass = "text-base";
  } else if (size === "lg") {
    sizeClass = "w-28 h-28";
    textSizeClass = "text-5xl";
  } else {
    sizeClass = "w-8 h-8";
    textSizeClass = "text-lg";
  }

  const goToProfile = () => navigation.navigate("Profile");

  return (
    <Bump scaleValue={0.9} disabled={disabled}>
      <MyPressable
        disabledFull={disabled}
        onPress={goToProfile}
        className={`rounded-full bg-light items-center justify-center ${sizeClass}`}
      >
        <MyImage
          containerStyle={`rounded-full absolute overflow-hidden ${sizeClass}`}
          img={assets.defaultProfilePicture}
        />
        {profilePic ? (
          <MyImage
            containerStyle={`rounded-full absolute overflow-hidden ${sizeClass}`}
            img={{ uri: profilePic }}
            resizeMode="cover"
          />
        ) : (
          <MyText
            className={`text-background-dark font-medium ${textSizeClass}`}
          >
            {letter}
          </MyText>
        )}
      </MyPressable>
    </Bump>
  );
};

export default Avatar;
