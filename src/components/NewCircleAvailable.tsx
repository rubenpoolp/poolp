import assets from "@assets/index";
import { t } from "i18next";
import { View } from "react-native";
import CornerSparkles from "./CornerSparkles";
import MyButton from "./natives/MyButton";
import MyImage from "./natives/MyImage";
import MyText from "./natives/MyText";

const NewCircleAvailable = ({ onPress }: { onPress: () => void }) => {
  return (
    <View className="flex-1 w-full space-y-10 justify-center">
      <MyImage img={assets.logoCropped} containerStyle="h-24" />

      <View className="items-center space-y-4">
        <MyText className="text-3xl font-semibold text-center">
          {t("home.newCircleAvailable")}
        </MyText>

        <MyText className="text-center font-thin text-lg">
          {t("home.newCircleAvailableDescription")}
        </MyText>
      </View>

      <View className="space-y-4 px-4">
        <CornerSparkles>
          <MyButton
            txt={t("home.makeStory")}
            txtClassName="font-bold text-lg"
            onPress={onPress}
          />
        </CornerSparkles>
      </View>
    </View>
  );
};

export default NewCircleAvailable;
