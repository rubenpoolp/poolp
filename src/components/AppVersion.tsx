import * as Application from "expo-application";
import * as Updates from "expo-updates";
import { View } from "react-native";
import MyText from "./natives/MyText";

const AppVersion = () => {
  return (
    <View>
      {Application.nativeApplicationVersion && (
        <MyText className="text-dark mb-1">
          Version : {Application.nativeApplicationVersion}
        </MyText>
      )}
      {Application.nativeBuildVersion && (
        <MyText className="text-dark mb-1">
          Build : {Application.nativeBuildVersion}
        </MyText>
      )}
      {Updates.updateId && (
        <MyText className="text-dark">
          Update Id : {Updates.updateId.slice(-4)}
        </MyText> // Only show last 4 characters
      )}
    </View>
  );
};

export default AppVersion;
