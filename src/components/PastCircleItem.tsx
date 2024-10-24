import Avatar from "@components/Avatar";
import MyButton from "@components/natives/MyButton";
import MyText from "@components/natives/MyText";
import { useNavigation } from "@react-navigation/native";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

interface PastCircleItemProps {
  item: any;
  listLength: number;
  index: number;
}

const PastCircleItem = ({ item, listLength, index }: PastCircleItemProps) => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate("PastCircleDetails", { circle: item });
  };

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
          left: (index % 2) * 20,
          top: Math.floor(index / 2) * 20,
        };
      default:
        return { left: 0, top: 0 };
    }
  };

  return (
    <View
      className={`w-full flex-row items-center justify-between bg-gray-600 p-4 
          ${index === 0 ? "rounded-t-lg" : ""} 
          ${index === listLength - 1 ? "rounded-b-lg" : "border-b border-gray-500"}`}
    >
      <View className="flex-row">
        <View className="mr-3 w-16 h-16 relative">
          {item.participants.map((participant: any, index: number) => {
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
                <Avatar />
              </View>
            );
          })}
        </View>

        <View className="flex-1 space-y-2">
          <MyText className="text-light">{item.name}</MyText>

          <View className="w-1/2">
            <MyButton
              txt={t("actions.details")}
              size="small"
              onPress={onPress}
            />
          </View>
        </View>

        <MyText className="text-gray-400 text-sm">
          {format(item.date, "dd.MM")}
        </MyText>
      </View>
    </View>
  );
};

export default PastCircleItem;
