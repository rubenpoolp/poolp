import AppVersion from "@components/AppVersion";
import Avatar from "@components/Avatar";
import MyScreen from "@components/MyScreen";
import MyButton from "@components/natives/MyButton";
import MyText from "@components/natives/MyText";
import { useAuth } from "@context/Auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import resetTo from "@utils/resetTo";
import React from "react";
import { Alert, View } from "react-native";

const Home = () => {
  const navigation = useNavigation();
  const { signOut, user } = useAuth();

  const signOutWithThen = () => {
    Alert.alert(
      "Are you sure you want to sign out?",
      "",
      [
        {
          text: "Cancel",
        },
        {
          style: "destructive",
          text: "Sign out",
          onPress: () => {
            signOut().then(() => {
              AsyncStorage.clear();
              resetTo(navigation, "Loader");
            });
          },
        },
      ],
      { cancelable: false },
    );
  };

  return (
    <MyScreen className="px-4">
      <View className="flex-row justify-between items-center w-full">
        <View className="w-10" />
        <MyText className="text-3xl font-semibold">Home</MyText>
        <Avatar />
      </View>

      <View className="self-start">
        <MyButton onPress={signOutWithThen} txt={"Sign out"} className="mb-2" />
        <AppVersion />
      </View>
    </MyScreen>
  );
};

export default Home;
