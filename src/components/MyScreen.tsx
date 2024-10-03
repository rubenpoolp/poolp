import { StatusBar } from "expo-status-bar";
import { ReactNode } from "react";
import { Platform, View } from "react-native";
import { Edges, SafeAreaView } from "react-native-safe-area-context";

interface MyScreenProps {
  children: ReactNode;
  backgroundColor?: string;
  edges?: Edges;
  className?: string;
  style?: any;
  padding?: boolean;
}

const MyScreen = ({
  children,
  backgroundColor = "bg-background-dark",
  edges = ["top", "bottom"],
  style,
  padding = false,
}: MyScreenProps) => (
  <SafeAreaView
    edges={edges}
    className={`flex-1 ${backgroundColor} ${Platform.OS === "android" && "pt-6"}`}
  >
    <View
      className={`flex-1 items-center justify-between ${padding && "px-4"}`}
      style={style}
    >
      {children}
    </View>
  </SafeAreaView>
);

export default MyScreen;
