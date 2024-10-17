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
  if (!tab) return null;

  let iconContent = null;
  if (tab.name === "Profile") {
    iconContent = <Avatar size="sm" disabled={true} />;
  } else if (tab.Icon) {
    iconContent = <tab.Icon size={24} color={colors.light} />;
  }

  return (
    <View className="items-center justify-center h-full pt-3">
      {iconContent}
      {focused && <View className="absolute bottom-0 w-7 h-[1px] bg-light" />}
    </View>
  );
};

export default TabBarIcon;
