import { View } from "react-native";
import MyText from "./natives/MyText";
import { t } from "i18next";
import StoryButton from "./buttons/StoryButton";
import MyGradient from "./MyGradient";
import assets from "@assets/index";
import StackCarousel from "./carousel/StackCarousel";
import Animated, { FadeInDown } from "react-native-reanimated";

const data = [
  {
    id: "1",
    name: "John",
    pictures: [assets.test2, assets.test1],
  },
  {
    id: "2",
    name: "Jane",
    pictures: [assets.test1, assets.test2, assets.test1],
  },
  {
    id: "3",
    name: "Alice",
    pictures: [assets.test2, assets.test1],
  },
  {
    id: "4",
    name: "Bob",
    pictures: [assets.test1, assets.test2],
  },
];

interface TodayCircleProps {}
const TodayCircle = ({}: TodayCircleProps) => {
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
        <Animated.View
          entering={FadeInDown.duration(300)}
          className="px-6 py-2 rounded-xl border-2 border-gradient-primary-1"
        >
          <MyGradient className="rounded-lg" />
          <MyText className="font-semibold text-md">
            {t("actions.openCircle")}
          </MyText>
        </Animated.View>
      </StoryButton>
    </View>
  );
};

export default TodayCircle;
