import UserProfileButton from "@components/buttons/UserProfileButton";
import MyHeader from "@components/headers/MyHeader";
import MyScreen from "@components/MyScreen";
import MyUserAvatar from "@components/MyUserAvatar";
import MyImage from "@components/natives/MyImage";
import MyText from "@components/natives/MyText";
import Heart from "@components/SVGs/Heart";
import { gradient } from "@config/colors";
import shadow from "@config/shadow";
import { useWhoLikedYou } from "@hooks/useWhoLikedYou";
import { UserProfilePics } from "@types/story";
import i18n from "@utils/i18n";
import { t } from "i18next";
import { BellRinging } from "phosphor-react-native";
import React from "react";
import { ActivityIndicator, FlatList, View } from "react-native";

type UserToDiscover = {
  userProfilePics: UserProfilePics;
  name: string;
  avatar: string;
  liked: boolean;
  ringed: boolean;
};

const User = ({ item }: { item: UserToDiscover }) => {
  return (
    <UserProfileButton userProfilePics={item.userProfilePics}>
      <View className="flex-row items-center justify-between mb-7">
        <View className="flex-row items-center">
          <View className="w-16 h-16 mr-4">
            {item.avatar && (
              <MyImage
                img={item.avatar}
                containerStyle="w-full h-full rounded-full overflow-hidden "
              />
            )}
          </View>
          <MyText className="text-xl font-semibold">{item.name}</MyText>
        </View>
        <View className="flex-row items-center space-x-4">
          {item.ringed && (
            <View className="h-6 w-6">
              <BellRinging
                size={24}
                weight="bold"
                color={gradient.primary[0]}
              />
            </View>
          )}
          {item.liked && (
            <View className="h-6 w-6">
              <Heart style={shadow.purple} color={gradient.primary[0]} />
            </View>
          )}
        </View>
      </View>
    </UserProfileButton>
  );
};

const WhoLikedYou = () => {
  const { users, isLoading } = useWhoLikedYou();

  return (
    <MyScreen padding className="items-center justify-start">
      <MyHeader canGoBack />
      <View className="items-center">
        <MyUserAvatar size="xl" />
        <MyText
          className="mb-14 mt-8 text-xl font-semibold"
          style={shadow.purple}
        >
          {i18n.t("paywall.whoLikedYou")}
        </MyText>
      </View>
      {isLoading ? (
        <View className="flex-1 items-center flex-row space-x-2">
          <ActivityIndicator color={gradient.primary[0]} />
          <MyText>Loading...</MyText>
        </View>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          className="flex-1 w-full px-3"
          data={users}
          renderItem={User}
          keyExtractor={(item) => item.name}
          ListEmptyComponent={() => <MyText>{t("paywall.noUsers")}</MyText>}
        />
      )}
    </MyScreen>
  );
};

export default WhoLikedYou;
