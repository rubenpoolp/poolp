import useGetProfilePics from "@api/profilePics/getProfilePics.hook";
import TabBarIcon from "@components/TabBarIcon";
import colors from "@config/colors";
import { TabBarPages, initialTab } from "@config/tabBarPages";
import useTodayCircle from "@hooks/useTodayCircle";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useEffect, useState } from "react";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const [profilePicsCount, setProfilePicsCount] = useState(0);
  const { unseenStories } = useTodayCircle();

  const { data: profilePics } = useGetProfilePics();
  
  useEffect(() => {
    setProfilePicsCount(profilePics?.length || 0);
  }, [profilePics]);

  const checkIfBadgeIsVisible = (route: string):boolean => {
    if (route === "Profile") {
      return profilePicsCount < 3;
    }
    if (route === "Home") {
      return unseenStories ?? false;
    }
    return false;
  };

  return (
    <Tab.Navigator
      initialRouteName={initialTab}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: colors.tabBar.background,
          paddingHorizontal: 32,
          height: 96,
        },
        tabBarIcon: ({ focused }) => (
          <TabBarIcon
            focused={focused}
            badge={checkIfBadgeIsVisible(route.name)}
            route={route}
          />
        ),
      })}
    >
      {TabBarPages.map((tab) => (
        <Tab.Screen key={tab.name} name={tab.name} component={tab.component} />
      ))}
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
