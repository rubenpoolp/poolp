import assets from "@assets/index";
import { t } from "i18next";
import { View } from "react-native";
import MyImage from "./natives/MyImage";
import MyText from "./natives/MyText";

const LogoWithText = () => {
  return (
    <View className="items-center space-y-5 mb-10">
      <MyImage img={assets.logoCropped} containerStyle="h-24" />
      <MyText className="text-4xl font-semibold">
        {t("introduction.title")}
      </MyText>
    </View>
  );
};

export default LogoWithText;
