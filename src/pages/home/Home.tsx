import AppVersion from "@components/AppVersion";
import MyScreen from "@components/MyScreen";
import MyButton from "@components/natives/MyButton";
import MyText from "@components/natives/MyText";
import { useAuth } from "@context/Auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import resetTo from "@utils/resetTo";
import React from "react";
import { Alert, View } from "react-native";

const DisplayInfo = ({ title, value }: { title: string; value: string }) => {
  return (
    <View className="w-full flex-row justify-between items-center">
      <MyText className="text-lg font-semibold">{title}</MyText>
      <MyText className="text-lg">{value}</MyText>
    </View>
  );
};
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
          style: "destructive",
        },
        {
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
      <MyText className="text-3xl font-semibold">Home</MyText>
      <DisplayInfo title="PhoneNumber" value={user?.phone} />
      <View className="self-start">
        <MyButton onPress={signOutWithThen} txt={"Sign out"} className="mb-2" />
        <AppVersion />
      </View>
    </MyScreen>
  );
};

export default Home;
