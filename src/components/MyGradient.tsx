import { gradient } from "@config/colors";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleProp, ViewStyle } from "react-native";

const MyGradient = ({
  colors = gradient.primary,
  start = { x: 0, y: 0 },
  end = { x: 0.6, y: 0 },
  style,
}: {
  colors?: string[];
  start?: { x: number; y: number };
  end?: { x: number; y: number };
  children?: React.ReactNode;
  className?: string;
  style?: StyleProp<ViewStyle>;
}) => {
  return (
    <LinearGradient
      colors={colors}
      start={start}
      end={end}
      className="absolute top-0 left-0 right-0 bottom-0"
      style={style}
    />
  );
};

export default MyGradient;
