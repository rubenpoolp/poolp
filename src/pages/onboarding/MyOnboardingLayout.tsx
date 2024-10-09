import assets from "@assets/index";
import BackButton from "@components/buttons/BackButton";
import NextButton from "@components/buttons/NextButton";
import MyKeyboardAvoidingView from "@components/MyKeyboardAvoidingView";
import MyScreen from "@components/MyScreen";
import MyImage from "@components/natives/MyImage";
import React, { ReactNode } from "react";
import { View } from "react-native";

interface LayoutProps {
  children: ReactNode;
  onNextPress: () => void;
  canGoBack?: boolean;
  logo?: boolean;
  contentContainerStyle?: string;
}

const MyOnboardingLayout = ({
  children,
  onNextPress,
  canGoBack = true,
  logo = true,
  contentContainerStyle,
}: LayoutProps) => {
  return (
    <MyScreen padding>
      <MyKeyboardAvoidingView>
        <View className="flex-1">
          <View className="flex-row justify-between items-center mb-12">
            <View className="w-14">{canGoBack && <BackButton />}</View>
            {logo && (
              <MyImage img={assets.logoCropped} containerStyle="h-10 w-20" />
            )}
            <View className="w-14" />
          </View>

          <View className={`flex-1 w-full ${contentContainerStyle}`}>
            {children}
          </View>

          <View className="items-center">
            <NextButton onPress={onNextPress} />
          </View>
        </View>
      </MyKeyboardAvoidingView>
    </MyScreen>
  );
};

export default MyOnboardingLayout;
