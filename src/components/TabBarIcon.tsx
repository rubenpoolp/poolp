import colors from "@config/colors";
import { TabBarPages } from "@config/tabBarPages";
import { View } from "react-native";
import Avatar from "@components/Avatar";

interface TabBarIconProps {
  focused: boolean;
  route: any;
}

const TabBarIcon = ({ focused, route }: TabBarIconProps) => {
  const tab = TabBarPages.find((t) => t.name === route.name);

  return (
    <View className="items-center justify-center h-full pt-3">
      {tab?.Icon && <tab.Icon size={24} color={colors.light} />}
      {focused && (
        <View className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-gradient-primary-1" />
      )}
    </View>
  );
};

export default TabBarIcon;
