import { View } from "react-native";
import MyText from "./natives/MyText";
import MyImage from "./natives/MyImage";
import { useTranslation } from "react-i18next";

interface OnboardingCarouselItemProps {
  title: string;
  description: string;
  picture: any;
}

const OnboardingCarouselItem = ({
  title,
  description,
  picture,
}: OnboardingCarouselItemProps) => {
  const { t } = useTranslation();

  return (
    <View className="flex-1 items-center space-y-4">
      {/* TODO: Change the size of the image */}
      <MyImage img={picture} containerStyle="h-96" />

      <View className="justify-center items-center space-y-2 ">
        <MyText className="text-2xl font-bold text-center">{t(title)}</MyText>
        <MyText className="text-gray-500 text-sm font-semibold text-center">
          {t(description)}
        </MyText>
      </View>
    </View>
  );
};

export default OnboardingCarouselItem;
