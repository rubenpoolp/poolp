import { Bump } from "@components/animations/Bump";
import MyHeader from "@components/headers/MyHeader";
import MyScreen from "@components/MyScreen";
import MyUserAvatar from "@components/MyUserAvatar";
import MyButton from "@components/natives/MyButton";
import MyPressable from "@components/natives/MyPressable";
import MyText from "@components/natives/MyText";
import Paywall from "@components/Paywall";
import { useAuth } from "@context/Auth";
import { useIsLoading } from "@context/IsLoading";
import useAppState from "@hooks/useAppState";
import useProfile from "@hooks/useProfile";
import { useNavigation } from "@react-navigation/native";
import { formatBasicDate, getDaysFromNow } from "@utils/dates";
import { getIsSubscribed } from "@utils/purchase";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, View } from "react-native";

const DisplayInfo = ({
  title,
  value,
  onPress,
  txtClassName,
}: {
  title: string;
  value: string;
  onPress?: () => void;
  txtClassName?: string;
}) => {
  const { t } = useTranslation();
  const { setIsLoading } = useIsLoading();

  const handlePress = () => {
    setIsLoading(true);
    onPress?.();
    setIsLoading(false);
  };

  return (
    <MyPressable
      className="w-full flex-row justify-between items-center mb-7"
      onPress={handlePress}
      disabledFull={!onPress}
    >
      <MyText className={`text-lg font-semibold ${txtClassName}`}>
        {t(title)}
      </MyText>
      <MyText className="text-gray-500 font-semibold">{value}</MyText>
    </MyPressable>
  );
};

const Profile = () => {
  const [isPaywallVisible, setIsPaywallVisible] = useState(false);
  const { t } = useTranslation();
  const list = useProfile();
  const auth = useAuth();
  const createdAt = auth.user?.created_at
    ? new Date(auth.user.created_at)
    : new Date();
  const days = getDaysFromNow(createdAt);
  const date = formatBasicDate(createdAt);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const navigation = useNavigation();
  const appState = useAppState();

  useEffect(() => {
    const checkSubscription = async () => {
      const isSubscribed = await getIsSubscribed();
      setIsSubscribed(isSubscribed);
    };
    checkSubscription();
  }, [appState]);

  return (
    <MyScreen edges={["top"]}>
      <View>
        <MyHeader />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 0,
          paddingHorizontal: 32,
          paddingBottom: 32,
        }}
      >
        <View className="flex space-y-16">
          <View className="flex items-center justify-center space-y-16">
            <View className="w-full items-center">
              <MyUserAvatar disabled size="xl" />

              <View className="absolute -bottom-5">
                <Bump scaleValue={0.95}>
                  <MyButton
                    onPress={() => {
                      navigation.navigate("ProfilePicture");
                    }}
                    txt="Add pictures"
                    txtClassName="font-semibold text-base"
                    className="px-6"
                    badge
                  />
                </Bump>
              </View>
            </View>

            <View className="flex items-center justify-center">
              <Bump scaleValue={0.95}>
                <MyButton
                  onPress={() => {
                    if (isSubscribed) {
                      navigation.navigate("WhoLikedYou");
                    } else {
                      setIsPaywallVisible(true);
                    }
                  }}
                  txt={t("profile.seeWhoLikedYou")}
                  size="medium"
                  variant="gold"
                />
              </Bump>
            </View>
          </View>

          <View>
            {list.map((item, index) => (
              <DisplayInfo
                key={index}
                title={item.name}
                value={item.value ?? ""}
                onPress={item.onPress}
                txtClassName={item.txtClassName ?? ""}
              />
            ))}
          </View>
        </View>

        <View className="items-center">
          <MyText className="text-gray-400 text-xs">
            {t("profile.joinedDaysAgo", { days })}
          </MyText>
          <MyText className="text-gray-400 text-xs">
            {t("profile.onDay", { date })}
          </MyText>
          <MyText>❤️</MyText>
        </View>
      </ScrollView>
      <Paywall
        isVisible={isPaywallVisible}
        onClose={() => setIsPaywallVisible(false)}
      />
    </MyScreen>
  );
};

export default Profile;
