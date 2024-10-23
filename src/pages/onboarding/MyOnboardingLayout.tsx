import assets from "@assets/index";
import BackButton from "@components/buttons/BackButton";
import NextButton from "@components/buttons/NextButton";
import SkipButton from "@components/buttons/SkipButton";
import MyKeyboardAvoidingView from "@components/MyKeyboardAvoidingView";
import MyScreen from "@components/MyScreen";
import MyImage from "@components/natives/MyImage";
import MyText from "@components/natives/MyText";
import React, { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

interface LayoutProps {
  children: ReactNode;
  onNextPress: () => void;
  canGoBack?: boolean;
  logo?: boolean;
  logoSize?: "small" | "regular";
  contentContainerStyle?: string;
  title?: string;
  disableNextButton?: boolean;
  onSkipPress?: () => void;
  padding?: boolean;
  skipButton?: boolean;
}

const MyOnboardingLayout = ({
  children,
  onNextPress,
  canGoBack = true,
  logo = true,
  logoSize = "regular",
  contentContainerStyle,
  title,
  disableNextButton = false,
  skipButton = false,
  onSkipPress = () => {},
  padding = true,
}: LayoutProps) => {
  const { t } = useTranslation();

  return (
    <MyScreen padding={padding}>
      <MyKeyboardAvoidingView>
        <View className="flex-1">
          <View
            className={`space-y-2 justify-center items-center ${
              title ? "mb-4" : "mb-8"
            }`}
          >
            <View className="flex-row justify-between items-center w-full">
              <View className="w-14">{canGoBack && <BackButton />}</View>
              {logo && (
                <MyImage
                  img={assets.logoCropped}
                  containerStyle={
                    logoSize === "small" ? "h-7 w-10" : "h-10 w-20"
                  }
                />
              )}
              <View className="w-14" />
            </View>
            {title && (
              <MyText className="text-2xl font-bold">{t(title)}</MyText>
            )}
          </View>

          <View className={`flex-1 w-full ${contentContainerStyle}`}>
            {children}
          </View>

          <View className="flex-row justify-between items-center w-full">
            <View className="flex-1" />
            <View className="flex-1 items-center">
              <NextButton onPress={onNextPress} disabled={disableNextButton} />
            </View>

            <View className="flex-1">
              {skipButton && <SkipButton onPress={onSkipPress} />}
            </View>
          </View>
        </View>
      </MyKeyboardAvoidingView>
    </MyScreen>
  );
};

export default MyOnboardingLayout;
