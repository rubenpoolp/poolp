import assets from "@assets/index";
import BackButton from "@components/buttons/BackButton";
import MyHeader from "@components/headers/MyHeader";
import MyButton from "@components/natives/MyButton";
import MyImage from "@components/natives/MyImage";
import MyPressable from "@components/natives/MyPressable";
import colors from "@config/colors";
import { useNavigation } from "@react-navigation/native";
import { ClockCounterClockwise } from "phosphor-react-native";
import { View } from "react-native";

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
        <View className="flex-row justify-between items-start">
          {pastCircleButton && (
            <MyPressable
              onPress={handlePastCirclePress}
              hapticImpactStyle="medium"
              // className="bg-gray-100 rounded-full p-1.5"
            >
              <ClockCounterClockwise size={24} color={colors.light} />
            </MyPressable>
          )}

          {canGoBack && (
            <View className="-ml-2">
              <BackButton />
            </View>
          )}

          <View className="flex justify-between items-center flex-1 space-y-4">
            <MyImage
              img={assets.gradientTypoLogo}
              containerStyle="h-8"
              loader={false}
            />

            <View>
              <MyButton txt={txt} size="small" onPress={onPress} />
            </View>
          </View>

          {pastCircleButton && <View className="w-7" />}
          {canGoBack && <View className="w-7" />}
        </View>
      }
    />
  );
};

export default LogoWithButtonHeader;
