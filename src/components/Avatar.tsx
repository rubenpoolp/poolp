import assets from "@assets/index";
import { useAuth } from "@context/Auth";
import { useNavigation } from "@react-navigation/native";
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
  const letter = user?.name ? user.name.charAt(0) : "L";

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

  const goToProfile = () => {
    navigation.navigate("Profile");
  };

  return (
    <Bump scaleValue={0.9} disabled={disabled}>
      <MyPressable
        disabledFull={disabled}
        onPress={goToProfile}
        className={`rounded-full bg-light items-center justify-center ${sizeClass}`}
      >
        <MyImage
          containerStyle={`w-10 h-10 rounded-full absolute overflow-hidden ${sizeClass}`}
          img={assets.defaultProfilePicture}
        />
        {user?.profile_picture_url ? (
          <MyImage
            containerStyle={`rounded-full absolute overflow-hidden ${sizeClass}`}
            img={{ uri: user?.profile_picture_url }}
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
