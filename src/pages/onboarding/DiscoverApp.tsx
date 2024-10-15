import assets from "@assets/index";
import NextButton from "@components/buttons/NextButton";
import MyKeyboardAvoidingView from "@components/MyKeyboardAvoidingView";
import MyScreen from "@components/MyScreen";
import MyImage from "@components/natives/MyImage";
import { ReactNode } from "react";
import { View } from "react-native";
import MyOnboardingLayout from "./MyOnboardingLayout";

interface LayoutProps {
  navigation: any;
  route: any;
}

const DiscoverApp = ({ navigation, route }: LayoutProps) => {
  const { user, nextScreen } = route.params;

  const handleNext = () => {
    navigation.navigate(nextScreen, { user });
  };

  return (
    <MyOnboardingLayout
      onNextPress={handleNext}
      logoSize="small"
      canGoBack={false}
      title="onboarding.discoverApp.title"
    >
      <View className="flex-1 justify-center items-center"></View>
    </MyOnboardingLayout>
  );
};

export default DiscoverApp;
