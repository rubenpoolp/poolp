import assets from "@assets/index";
import { useAuth } from "@context/Auth";
import { useNavigation } from "@react-navigation/native";
import { Bump } from "./animations/Bump";
import MyImage from "./natives/MyImage";
import MyPressable from "./natives/MyPressable";
import MyText from "./natives/MyText";

const Avatar = () => {
  const { user } = useAuth();
  const navigation = useNavigation();

  const goToProfile = () => {
    navigation.navigate("Profile");
  };

  return (
    <Bump scaleValue={0.9}>
      <MyPressable
        onPress={goToProfile}
        className="w-10 h-10 rounded-full bg-light items-center justify-center"
      >
        <MyImage
          containerStyle="w-10 h-10 rounded-full absolute overflow-hidden"
          img={assets.defaultProfilePicture}
        />
        {user?.profile_picture_url ? (
          <MyImage
            containerStyle="w-10 h-10 rounded-full"
            img={{ uri: user?.profile_picture_url }}
          />
        ) : (
          <MyText className="text-background-dark text-xl font-semibold">
            {user?.name?.charAt(0)}
          </MyText>
        )}
      </MyPressable>
    </Bump>
  );
};

export default Avatar;
