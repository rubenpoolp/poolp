import useGetMyDailyCircle from "@api/circles/getMyDailyCircle.hook";
import useTodayCircle from "@hooks/useTodayCircle";
import { t } from "i18next";
import { View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import StoryButton from "./buttons/StoryButton";
import StackCarousel from "./carousel/StackCarousel";
import MyGradient from "./MyGradient";
import MyText from "./natives/MyText";
import WaitingCard from "./WaitingCard";

const TodayCircle = () => {
  const { stories, usersProfilePics } = useTodayCircle();

  const { data: circle } = useGetMyDailyCircle();
  const isOnlyMeInCircle = circle?.user_ids?.length === 1;
  
  if (!stories || !usersProfilePics)
    return null;

  return (
    <View className="flex-1 items-center pb-4">
      <MyText className="text-3xl font-bold text-center mb-4">
        {t("home.currentCircle")}
      </MyText>
      

      <View className="flex-1 items-center">
        {isOnlyMeInCircle ? (
          <WaitingCard />
        ) : ( 
          <>
            {usersProfilePics && <StackCarousel data={usersProfilePics} />}
          </>  
        )}
      </View>

      {stories.length > 0 && (
        <View className="items-center justify-center mt-4">
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
      )}
    </View>
  );
};

export default TodayCircle;
