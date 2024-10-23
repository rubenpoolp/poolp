import { Bump } from "@components/animations/Bump";
import Avatar from "@components/Avatar";
import MyHeader from "@components/headers/MyHeader";
import MyScreen from "@components/MyScreen";
import MyButton from "@components/natives/MyButton";
import MyPressable from "@components/natives/MyPressable";
import MyText from "@components/natives/MyText";
import colors from "@config/colors";
import useProfile from "@hooks/useProfile";
import { useNavigation } from "@react-navigation/native";
import React from "react";
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

  return (
    <MyPressable
      className="w-full flex-row justify-between items-center mb-7"
      onPress={onPress}
    >
      <MyText className={`text-lg font-semibold ${txtClassName}`}>
        {t(title)}
      </MyText>
      <MyText className="text-gray-500 font-semibold">{value}</MyText>
    </MyPressable>
  );
};

const Profile = () => {
  const { t } = useTranslation();
  const list = useProfile();

  const navigation = useNavigation();

  return (
    <MyScreen edges={["top"]} padding>
      <View>
        <MyHeader />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 0,
          paddingHorizontal: 16,
          paddingBottom: 32,
        }}
      >
        <View className="flex space-y-16">
          <View className="relative flex items-center justify-center space-y-16">
            <View className="relative w-full items-center">
              <Avatar disabled size="lg" />

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
                  onPress={() => {}}
                  txt={t("profile.seeWhoLikedYou")}
                  size="medium"
                  txtClassName="font-lg text-gold-100"
                  variant="gold"
                  className="mb-2"
                />
              </Bump>
              <MyText className="text-gold-100 font-light">
                Available in 7 circles
              </MyText>
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
            You joined your first circle 44 days ago.
          </MyText>
          <MyText className="text-gray-400 text-xs">On 25.09.2024</MyText>
          <MyText>❤️</MyText>
        </View>
      </ScrollView>
    </MyScreen>
  );
};

export default Profile;
