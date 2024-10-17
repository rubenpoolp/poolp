import Avatar from "@components/Avatar";
import MyButton from "@components/natives/MyButton";
import MyText from "@components/natives/MyText";
import { circles } from "@pages/circles/Circles";
import { format } from "date-fns";
import { View } from "react-native";

const PastCircleItem = ({ item }: { item: (typeof circles)[0] }) => {
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

export default PastCircleItem;
