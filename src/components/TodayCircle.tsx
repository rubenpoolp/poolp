import useTodayCircle from "@hooks/useTodayCircle";
import { t } from "i18next";
import { View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import StoryButton from "./buttons/StoryButton";
import StackCarousel from "./carousel/StackCarousel";
import MyGradient from "./MyGradient";
import MyText from "./natives/MyText";

const TodayCircle = () => {
  const { stories } = useTodayCircle();

  if (!stories) return null;
  return (
    <View className="flex-1 items-center">
      <MyText className="text-3xl font-bold text-center">
        {t("home.currentCircle")}
      </MyText>

      <StackCarousel data={stories} />

      <StoryButton stories={stories}>
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
