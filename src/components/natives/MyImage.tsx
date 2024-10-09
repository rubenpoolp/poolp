import { pink } from "@config/colors";
import React, { useState } from "react";
import { ActivityIndicator, Image, View } from "react-native";

interface MyImageProps {
  style?: string;
  containerStyle?: string;
  loaderStyle?: string;
  resizeMode?: "cover" | "contain" | "stretch" | "repeat" | "center";
  img: any;
  loader?: boolean;
}

const MyImage = ({
  resizeMode = "contain",
  style,
  containerStyle,
  loaderStyle,
  img,
  loader = true,
}: MyImageProps): React.ReactElement => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <View
      className={`w-full h-full items-center justify-center ${containerStyle}`}
    >
      <Image
        resizeMode={resizeMode}
        className={`${style} w-full h-full flex-1`}
        source={typeof img === "string" ? { uri: img } : img}
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => setIsLoading(false)}
      />
      {isLoading && loader && (
        <ActivityIndicator
          className={`z-10 absolute right-4 ${
            loaderStyle ? loaderStyle : "bottom-4"
          }`}
          size={"small"}
          color={pink[100]}
        />
      )}
    </View>
  );
};

export default MyImage;
