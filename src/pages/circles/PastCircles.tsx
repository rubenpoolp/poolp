import MyScreen from "@components/MyScreen";
import MyText from "@components/natives/MyText";
import React from "react";
import { FlatList, View } from "react-native";

import assets from "@assets/index";
import StreakButton from "@components/buttons/StreakButton";
import LogoWithButtonHeader from "@components/headers/LogoWithButtonHeader";
import PastCircleItem from "@components/PastCircleItem";
import { useTranslation } from "react-i18next";

export const circles = [
  {
    id: 0,
    name: "Past circle",
    date: new Date(2023, 8, 24),
    participants: [
      { id: 0, avatar: assets.defaultProfilePicture, name: "John Doe" },
      { id: 1, avatar: assets.defaultProfilePicture, name: "Jane Doe" },
      { id: 2, avatar: assets.defaultProfilePicture, name: "John Doe" },
    ],
  },
  {
    id: 1,
    name: "Past circle",
    date: new Date(2023, 8, 23),
    participants: [
      { id: 0, avatar: assets.defaultProfilePicture, name: "John Doe" },
      { id: 1, avatar: assets.defaultProfilePicture, name: "Jane Doe" },
      { id: 2, avatar: assets.defaultProfilePicture, name: "John Doe" },
      { id: 3, avatar: assets.defaultProfilePicture, name: "Jane Doe" },
    ],
  },
  {
    id: 2,
    name: "Past circle",
    date: new Date(2023, 8, 22),
    participants: [
      { id: 0, avatar: assets.defaultProfilePicture, name: "John Doe" },
      { id: 1, avatar: assets.defaultProfilePicture, name: "Jane Doe" },
    ],
  },
  {
    id: 3,
    name: "Past circle",
    date: new Date(2023, 8, 21),
    participants: [
      { id: 0, avatar: assets.defaultProfilePicture, name: "John Doe" },
      { id: 1, avatar: assets.defaultProfilePicture, name: "Jane Doe" },
    ],
  },

  {
    id: 7,
    name: "Past circle",
    date: new Date(2023, 8, 17),
    participants: [
      { id: 0, avatar: assets.defaultProfilePicture, name: "John Doe" },
      { id: 1, avatar: assets.defaultProfilePicture, name: "Jane Doe" },
      { id: 2, avatar: assets.defaultProfilePicture, name: "John Doe" },
    ],
  },
];

const PastCircles = () => {
  const { t } = useTranslation();

  return (
    <MyScreen edges={["top"]} padding className="space-y-2">
      <LogoWithButtonHeader
        onPress={() => {}}
        txt={t("actions.invitePeers")}
        canGoBack
      />
      <View className="flex-row justify-between items-end w-full">
        <MyText className="text-xs font-bold text-white">LAST CIRCLES</MyText>
        <StreakButton onPress={() => {}} disabled />
      </View>

      <FlatList
        className="flex-1"
        showsVerticalScrollIndicator={false}
        data={circles}
        renderItem={({ item, index }) => (
          <PastCircleItem item={item} index={index} />
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{
          paddingBottom: 60,
        }}
      />
    </MyScreen>
  );
};

export default PastCircles;
