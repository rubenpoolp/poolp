import React, { ReactNode } from "react";
import { View } from "react-native";
import MyScreen from "@src/components/MyScreen";
import MyImage from "@src/components/natives/MyImage";
import NextButton from "@src/components/buttons/NextButton";
import MyKeyboardAvoidingView from "@src/components/MyKeyboardAvoidingView";
import assets from "@assets/index";

interface LayoutProps {
  children: ReactNode;
  onNextPress: () => void;
  logo?: boolean;
  contentContainerStyle?: string;
}

const MyOnboardingLayout: React.FC<LayoutProps> = ({
  children,
  onNextPress,
  logo = true,
  contentContainerStyle,
}) => {
  return (
    <MyScreen padding>
      <MyKeyboardAvoidingView>
        <View className="flex-1 w-full justify-between">
          <View className="flex-1">
            {logo && (
              <View className="w-full mb-12">
                <MyImage img={assets.icon} containerStyle="h-10" />
              </View>
            )}

            <View className={`flex-1 w-full ${contentContainerStyle}`}>
              {children}
            </View>
          </View>

          <View className="w-full">
            <NextButton onPress={onNextPress} />
          </View>
        </View>
      </MyKeyboardAvoidingView>
    </MyScreen>
  );
};

export default MyOnboardingLayout;
