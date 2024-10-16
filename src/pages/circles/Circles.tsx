import MyScreen from "@components/MyScreen";
import MyText from "@components/natives/MyText";
import { format } from "date-fns";
import React from "react";
import { FlatList, View } from "react-native";

import assets from "@assets/index";
import Avatar from "@components/Avatar";
import StreakButton from "@components/buttons/StreakButton";
import MyButton from "@components/natives/MyButton";

const circles = [
  {
    id: 0,
    name: "Past circle",
    date: new Date(2023, 8, 26), // 23.09
    participants: [{ id: 0, avatar: assets.defaultProfilePicture }],
  },
  {
    id: 1,
    name: "Past circle",
    date: new Date(2023, 8, 25), // 23.09
    participants: [
      { id: 0, avatar: assets.defaultProfilePicture },
      { id: 1, avatar: assets.defaultProfilePicture },
    ],
  },
  {
    id: 2,
    name: "Past circle",
    date: new Date(2023, 8, 24), // 23.09
    participants: [
      { id: 0, avatar: assets.defaultProfilePicture },
      { id: 1, avatar: assets.defaultProfilePicture },
      { id: 2, avatar: assets.defaultProfilePicture },
    ],
  },
  {
    id: 3,
    name: "Past circle",
    date: new Date(2023, 8, 23), // 23.09
    participants: [
      { id: 0, avatar: assets.defaultProfilePicture },
      { id: 1, avatar: assets.defaultProfilePicture },
      { id: 2, avatar: assets.defaultProfilePicture },
      { id: 3, avatar: assets.defaultProfilePicture },
    ],
  },
  // ... autres cercles
];

const CircleItem = ({ item }: { item: (typeof circles)[0] }) => {
  const getAvatarPosition = (index: number, total: number) => {
    switch (total) {
      case 1:
        return { left: 10, top: 10 };
      case 2:
        return { left: index * 24, top: 10 };
      case 3:
        switch (index) {
          case 0:
            return { left: 0, top: 0 };
          case 1:
            return { left: 20, top: 0 };
          case 2:
            return { left: 10, top: 20 };
        }
      case 4:
        return {
          left: (index % 2) * 24,
          top: Math.floor(index / 2) * 24,
        };
      default:
        return { left: 0, top: 0 };
    }
  };

  return (
    <View
      className={`w-full flex-row items-center justify-between bg-gray-600 p-4 
        ${item.id === 0 ? "rounded-t-lg" : ""} 
        ${item.id === circles.length - 1 ? "rounded-b-lg" : "border-b border-gray-500"}`}
    >
      <View className="flex-row ">
        <View className="mr-3 w-16 h-16 relative">
          {item.participants.map((participant, index) => {
            const position = getAvatarPosition(index, item.participants.length);
            return (
              <View
                key={participant.id}
                style={{
                  position: "absolute",
                  ...position,
                  zIndex: index,
                }}
              >
                <Avatar size="sm" />
              </View>
            );
          })}
        </View>

        <View className="flex-1 space-y-2">
          <MyText className="text-light">{item.name}</MyText>

          <MyButton txt={"Details"} size="small" disabled />
        </View>

        <MyText className="text-gray-400 text-sm">
          {format(item.date, "dd.MM")}
        </MyText>
      </View>
    </View>
  );
};

const Circles = () => {
  return (
    <MyScreen padding className="space-y-2">
      <View className="flex-row justify-between items-end w-full">
        <MyText className="text-sm font-bold text-white">LAST CIRCLES</MyText>
        <StreakButton onPress={() => {}} disabled />
      </View>

      <FlatList
        className="flex-1"
        showsVerticalScrollIndicator={false}
        data={circles}
        renderItem={({ item }) => <CircleItem item={item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{
          paddingBottom: 140,
        }}
      />
    </MyScreen>
  );
};

export default Circles;
