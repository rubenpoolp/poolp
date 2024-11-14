import MyHeader from "@components/headers/MyHeader";
import MyScreen from "@components/MyScreen";
import MyUserAvatar from "@components/MyUserAvatar";
import MyImage from "@components/natives/MyImage";
import MyText from "@components/natives/MyText";
import Heart from "@components/SVGs/Heart";
import { gradient } from "@config/colors";
import shadow from "@config/shadow";
import i18n from "@utils/i18n";
import { BellRinging } from "phosphor-react-native";
import React from "react";
import { FlatList, View } from "react-native";

type UserToDiscover = {
  name: string;
  avatar: string;
  liked: boolean;
  ringed: boolean;
};

const User = ({ item }: { item: UserToDiscover }) => {
  return (
    <View className="flex-row items-center justify-between mb-7">
      <View className="flex-row items-center">
        <MyImage
          img={item.avatar}
          containerStyle="w-16 h-16 rounded-full overflow-hidden mr-4"
        />
        <MyText className="text-xl font-semibold">{item.name}</MyText>
      </View>
      <View className="flex-row items-center space-x-4">
        {item.ringed && (
          <View className="h-6 w-6">
            <BellRinging size={24} weight="bold" color={gradient.primary[0]} />
          </View>
        )}
        {item.liked && (
          <View className="h-6 w-6">
            <Heart style={shadow.purple} color={gradient.primary[0]} />
          </View>
        )}
      </View>
    </View>
  );
};

const WhoLikedYou = () => {
  const usersToDiscover: UserToDiscover[] = [
    {
      name: "John Doe",
      avatar:
        "https://dam.malt.com/0dd02c75-e1f6-4407-914b-acca8f88755d?gravity=face&func=face&face_margin=70&w=440&h=440&force_format=webp",
      liked: true,
      ringed: true,
    },
    {
      name: "Jane Doe",
      avatar:
        "https://dam.malt.com/0dd02c75-e1f6-4407-914b-acca8f88755d?gravity=face&func=face&face_margin=70&w=440&h=440&force_format=webp",
      liked: false,
      ringed: false,
    },
    {
      name: "John Doe",
      avatar:
        "https://dam.malt.com/0dd02c75-e1f6-4407-914b-acca8f88755d?gravity=face&func=face&face_margin=70&w=440&h=440&force_format=webp",
      liked: true,
      ringed: false,
    },
    {
      name: "John Doe",
      avatar:
        "https://dam.malt.com/0dd02c75-e1f6-4407-914b-acca8f88755d?gravity=face&func=face&face_margin=70&w=440&h=440&force_format=webp",
      liked: true,
      ringed: true,
    },
    {
      name: "Jane Doe",
      avatar:
        "https://dam.malt.com/0dd02c75-e1f6-4407-914b-acca8f88755d?gravity=face&func=face&face_margin=70&w=440&h=440&force_format=webp",
      liked: false,
      ringed: false,
    },
    {
      name: "John Doe",
      avatar:
        "https://dam.malt.com/0dd02c75-e1f6-4407-914b-acca8f88755d?gravity=face&func=face&face_margin=70&w=440&h=440&force_format=webp",
      liked: true,
      ringed: false,
    },
  ];

  return (
    <MyScreen padding>
      <MyHeader canGoBack />
      <MyUserAvatar size="xl" />
      <MyText
        className="mb-14 mt-8 text-xl font-semibold"
        style={shadow.purple}
      >
        {i18n.t("paywall.whoLikedYou")}
      </MyText>
      <FlatList
        showsVerticalScrollIndicator={false}
        className="flex-1 w-full px-3"
        data={usersToDiscover}
        renderItem={User}
      />
    </MyScreen>
  );
};

export default WhoLikedYou;
