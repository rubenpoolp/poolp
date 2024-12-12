import { Story, UserProfilePics } from "@/types/story";
import Avatar from "@components/Avatar";
import DotsThreeOnUser from "@components/buttons/DotsThreeOnUser";
import { useAuth } from "@context/Auth";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowBendUpLeft, CaretUp, X } from "phosphor-react-native";
import { useTranslation } from "react-i18next";
import { Platform, Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import StoryBarLoader from "../animations/StoriesBarLoader";
import MyButton from "../natives/MyButton";
import MyPressable from "../natives/MyPressable";
import MyText from "../natives/MyText";

interface OverlayStoryModalProps {
  onClose: () => void;
  stories?: Story[];
  userProfilePics?: UserProfilePics;
  actualIndex: number;
  duration: number;
  onLeft: () => void;
  onRight: () => void;
}

const AvatarNameTime = ({
  userProfilePictureUrl,
  username,
  date,
}: {
  userProfilePictureUrl: string;
  username: string;
  date: string;
}) => {
  return (
    <View className="flex-row items-center space-x-2">
      <Avatar size="sm" username={username} picture={userProfilePictureUrl} />
      <MyText className="text-sm">{username}</MyText>
      <MyText className="text-xs text-gray-100">{date}</MyText>
    </View>
  );
};

const OverlayStoryModal = ({
  onClose,
  stories,
  actualIndex,
  duration,
  onLeft,
  onRight,
  userProfilePics,
}: OverlayStoryModalProps) => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { user } = useAuth();

  return (
    <SafeAreaView
      edges={userProfilePics ? ["top", "bottom"] : ["top"]}
      className={`absolute w-full h-full ${Platform.OS === "android" && "pt-6"}`}
    >
      <View className="absolute w-full flex-1 h-4/5 bottom-28 justify-end flex-row z-10">
        <Pressable className="flex-1 " onPress={onLeft} />
        <Pressable className="flex-1" onPress={onRight} />
      </View>
      <LinearGradient
        colors={["rgba(0,0,0,0.5)", "transparent"]}
        className="absolute w-full h-1/2"
      />
      <View className="flex-1 px-4 justify-between">
        <View className="space-y-4">
          <StoryBarLoader
            index={actualIndex}
            duration={duration}
            total={
              userProfilePics && userProfilePics.urls
                ? userProfilePics.urls.length
                : stories
                  ? stories.length
                  : 0
            }
          />
          <View className="flex-row justify-between items-center">
            {userProfilePics ? (
              <View />
            ) : (
              <>
                {stories && (
                  <AvatarNameTime
                    userProfilePictureUrl={
                      stories?.[actualIndex].userProfilePictureUrl ?? ""
                    }
                    username={stories?.[actualIndex].userName}
                    date={stories?.[actualIndex].createdAtFormatted}
                  />
                )}
              </>
            )}
            <View className="self-end mr-2 flex-row space-x-2">
              {stories?.[actualIndex].user_id &&
                user?.id !== stories?.[actualIndex].user_id && (
                  <DotsThreeOnUser userId={stories?.[actualIndex].user_id} />
                )}

              <MyPressable onPress={onClose}>
                <X />
              </MyPressable>
            </View>
          </View>
        </View>
      </View>

      {userProfilePics ? (
        <View className="px-4">
          <MyText className="text-3xl font-semibold mb-4">
            {stories?.[actualIndex].userName}
          </MyText>

          <MyPressable onPress={onClose}>
            <View className="self-center">
              <CaretUp size={28} />
            </View>
          </MyPressable>
        </View>
      ) : (
        <View className="w-full bg-background-dark pt-5 pb-10">
          <MyButton
            className="self-center w-1/2 items-center justify-end"
            txt={t("camera.replyTo", {
              username: stories?.[actualIndex].userName,
            })}
            onPress={() => {
              onClose();
              navigation.navigate("Camera");
            }}
            LeftComponent={() => <View />}
            RightComponent={() => (
              <View className="ml-2">
                <ArrowBendUpLeft weight="bold" size={24} />
              </View>
            )}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default OverlayStoryModal;
