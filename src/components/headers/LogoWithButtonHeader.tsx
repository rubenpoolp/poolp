import assets from "@assets/index";
import MyButton from "@components/natives/MyButton";
import MyImage from "@components/natives/MyImage";
import { View } from "react-native";
import MyHeader from "@components/headers/MyHeader";
import { ArrowLeft, UserFocus } from "phosphor-react-native";
import colors from "@config/colors";
import MyPressable from "@components/natives/MyPressable";
import { useNavigation } from "@react-navigation/native";
import BackButton from "@components/buttons/BackButton";

interface LogoWithButtonHeaderProps {
  onPress: () => void;
  txt: string;
  pastCircleButton?: boolean;
  canGoBack?: boolean;
}

const LogoWithButtonHeader = ({
  onPress,
  txt,
  pastCircleButton = false,
  canGoBack = false,
}: LogoWithButtonHeaderProps) => {
  const navigation = useNavigation();

  const handlePastCirclePress = () => {
    navigation.navigate("PastCircles");
  };

  return (
    <MyHeader
      titleComponent={
        <View className="flex-row justify-between items-center">
          {pastCircleButton && (
            <MyPressable
              onPress={handlePastCirclePress}
              hapticImpactStyle="medium"
            >
              <UserFocus size={32} />
            </MyPressable>
          )}

          {canGoBack && (
            <View className="-ml-2">
              <BackButton />
            </View>
          )}

          <View className="flex justify-between items-center flex-1 space-y-4">
            <MyImage img={assets.gradientTypoLogo} containerStyle="h-8" />

            <View>
              <MyButton txt={txt} size="small" onPress={onPress} />
            </View>
          </View>

          {pastCircleButton && <View className="w-8" />}
          {canGoBack && <View className="w-7" />}
        </View>
      }
    />
  );
};

export default LogoWithButtonHeader;
