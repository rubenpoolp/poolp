import assets from "@assets/index";
import BackButton from "@src/components/buttons/BackButton";
import NextButton from "@src/components/buttons/NextButton";
import MyKeyboardAvoidingView from "@src/components/MyKeyboardAvoidingView";
import MyScreen from "@src/components/MyScreen";
import MyImage from "@src/components/natives/MyImage";
import React, { ReactNode } from "react";
import { View } from "react-native";

interface LayoutProps {
  children: ReactNode;
  onNextPress: () => void;
  canGoBack?: boolean;
  logo?: boolean;
  contentContainerStyle?: string;
}

const MyOnboardingLayout: React.FC<LayoutProps> = ({
  children,
  onNextPress,
  canGoBack = true,
  logo = true,
  contentContainerStyle,
}) => {
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
