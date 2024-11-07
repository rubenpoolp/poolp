import assets from "@assets/index";
import { Bump } from "./animations/Bump";
import MyImage from "./natives/MyImage";
import MyPressable from "./natives/MyPressable";
import MyText from "./natives/MyText";

const Avatar = ({
  onPress,
  username,
  picture,
  size = "md",
}: {
  onPress?: () => void;
  username?: string;
  picture?: string;
  size?: "sm" | "md" | "lg" | "xl";
}) => {
  const letter = username ? username.charAt(0) : "";

  let sizeClass = "";
  let textSizeClass = "";
  if (size === "sm") {
    sizeClass = "w-6 h-6";
    textSizeClass = "text-base";
  } else if (size === "lg") {
    sizeClass = "w-16 h-16";
    textSizeClass = "text-2xl";
  } else if (size === "xl") {
    sizeClass = "w-28 h-28";
    textSizeClass = "text-5xl";
  } else {
    sizeClass = "w-8 h-8";
    textSizeClass = "text-lg";
  }

  return (
    <Bump scaleValue={0.9} disabled={!onPress}>
      <MyPressable
        disabledFull={!onPress}
        onPress={onPress}
        className={`rounded-full bg-light items-center justify-center ${sizeClass}`}
      >
        <MyImage
          containerStyle={`rounded-full absolute overflow-hidden ${sizeClass}`}
          img={assets.defaultProfilePicture}
        />
        {picture ? (
          <MyImage
            containerStyle={`rounded-full absolute overflow-hidden ${sizeClass}`}
            img={{ uri: picture }}
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
