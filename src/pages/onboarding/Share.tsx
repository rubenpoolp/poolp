import { Bump } from "@components/animations/Bump";
import MyPressable from "@components/natives/MyPressable";
import MyText from "@components/natives/MyText";
import socialButtons from "@config/socialButtons";
import MyOnboardingLayout from "@pages/onboarding/MyOnboardingLayout";
import i18n from "@utils/i18n";
import { t } from "i18next";
import { Image, View } from "react-native";

const SocialButton = ({ item }: { item: (typeof socialButtons)[number] }) => {
  return (
    <Bump scaleValue={0.9}>
      <MyPressable
        onPress={() => item.onPress(t("share.message"))}
        className="bg-background-dark rounded-2xl"
        style={{
          shadowColor: item.color,
          shadowOffset: {
            width: 0,
            height: 8,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        {item.asset && <Image source={item.asset} className="w-16 h-16" />}
      </MyPressable>
    </Bump>
  );
};

const ShareButtons = () => {
  return (
    <View className="items-center">
      <View className="flex-row justify-center mb-3" style={{ gap: 24 }}>
        {socialButtons.slice(0, 3).map((item, index) => (
          <SocialButton key={index} item={item} />
        ))}
      </View>
      <View className="flex-row justify-center" style={{ gap: 24 }}>
        {socialButtons.slice(3).map((item, index) => (
          <SocialButton key={index + 3} item={item} />
        ))}
      </View>
    </View>
  );
};

const Share = ({ navigation, route }: { navigation: any; route: any }) => {
  const { nextScreen } = route.params;

  const handleNext = () => {
    navigation.navigate(nextScreen);
  };

  return (
    <MyOnboardingLayout onNextPress={handleNext}>
      <View className="flex w-full" style={{ gap: 80 }}>
        <MyText className="text-3xl font-semibold mb-5">
          {i18n.t("share.title")}
        </MyText>
        <ShareButtons />
      </View>
    </MyOnboardingLayout>
  );
};

export default Share;
