import { View } from "react-native";
import MyHeader from "./MyHeader";
import MyImage from "@components/natives/MyImage";
import assets from "@assets/index";

interface GradientLogoHeaderProps {
  canGoBack?: boolean;
}

const GradientLogoHeader = ({ canGoBack = false }: GradientLogoHeaderProps) => {
  return (
    <MyHeader
      titleComponent={
        <View className="flex justify-between items-center flex-1 space-y-4">
          <MyImage img={assets.gradientLogo} containerStyle="h-14" />
        </View>
      }
      canGoBack={canGoBack}
    />
  );
};

export default GradientLogoHeader;
