import colors from "@config/colors";
import { TabBarPages } from "@config/tabBarPages";
import { View } from "react-native";

interface TabBarIconProps {
  focused: boolean;
  route: any;
}

const TabBarIcon = ({ focused, route }: TabBarIconProps) => {
  const tab = TabBarPages.find((t) => t.name === route.name);

  return (
    <View className="items-center justify-center h-full">
      {tab?.Icon && (
        <tab.Icon
          size={28}
          color={colors.light}
          weight={focused ? "fill" : "regular"}
        />
      )}
      {focused && (
        <View className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-gradient-primary-1" />
      )}
    </View>
  );
};

export default TabBarIcon;
