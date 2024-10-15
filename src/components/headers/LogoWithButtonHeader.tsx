import assets from "@assets/index";
import MyButton from "@components/natives/MyButton";
import MyImage from "@components/natives/MyImage";
import { View } from "react-native";
import MyHeader from "@components/headers/MyHeader";

interface LogoWithButtonHeaderProps {
  onPress: () => void;
  txt: string;
}

const LogoWithButtonHeader = ({ onPress, txt }: LogoWithButtonHeaderProps) => {
  return (
    <MyHeader
      titleComponent={
        <View className="flex justify-between items-center w-full space-y-4">
          <MyImage img={assets.gradientTypoLogo} containerStyle="h-10 " />

          <View>
            <MyButton txt={txt} size="small" onPress={onPress} />
          </View>
        </View>
      }
    />
  );
};

export default LogoWithButtonHeader;
