import { TabBarPages } from "@config/tabBarPages";
import { View } from "react-native";

interface TabBarIconProps {
  focused: boolean;
  badge: boolean;
  route: any;
}

const TabBarIcon = ({ focused, badge, route }: TabBarIconProps) => {
  const tab = TabBarPages.find((t) => t.name === route.name);

  return (
    <View className="items-center justify-center h-full">
      {tab?.Icon && focused && <tab.Icon />}
      {tab?.IconFilled && !focused && <tab.IconFilled />}
      {badge && (
        <View className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-gradient-primary-1" />
      )}
    </View>
  );
};

export default TabBarIcon;
