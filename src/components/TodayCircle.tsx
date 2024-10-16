import { View } from "react-native";
import MyPressable from "./natives/MyPressable";
import MyText from "./natives/MyText";
import { t } from "i18next";
import StoryButton from "./buttons/StoryButton";
import MyGradient from "./MyGradient";
import assets from "@assets/index";
import StackCarousel from "./carousel/StackCarousel";

const data = [
  {
    id: "1",
    name: "John Doe",
    pictures: [assets.test1, assets.test2],
  },
  {
    id: "2",
    name: "Jane Smith",
    pictures: ["https://example.com/jane_1.jpg"],
  },
  {
    id: "3",
    name: "Alice Johnson",
    pictures: ["https://example.com/alice_1.jpg"],
  },
  {
    id: "4",
    name: "Bob Williams",
    pictures: ["https://example.com/bob_1.jpg"],
  },
  {
    id: "5",
    name: "Emma Brown",
    pictures: [
      "https://example.com/emma_1.jpg",
      "https://example.com/emma_2.jpg",
      "https://example.com/emma_3.jpg",
    ],
  },
];

interface TodayCircleProps {
  onOpenCircle: () => void;
}
const TodayCircle = ({ onOpenCircle }: TodayCircleProps) => {
  return (
    <View className="flex-1 items-center">
      <MyText className="text-3xl font-bold text-center">
        {t("home.currentCircle")}
      </MyText>

      <StackCarousel data={data} />

      <StoryButton
        stories={[
          {
            firstName: "John",
            img: assets.test1,
          },
          {
            firstName: "Ruben",
            img: assets.test2,
          },
        ]}
      >
        <View className="px-6 py-2 rounded-xl border-2 border-gradient-primary-1">
          <MyGradient className="rounded-lg" />
          <MyText className="font-semibold text-md">
            {t("actions.openCircle")}
          </MyText>
        </View>
      </StoryButton>

      <MyPressable onPress={onOpenCircle}>
        <MyText>{"back"}</MyText>
      </MyPressable>
    </View>
  );
};

export default TodayCircle;
