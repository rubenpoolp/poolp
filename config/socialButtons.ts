import assets from "@assets/index";
import { Linking } from "react-native";
import Share from "react-native-share";

const socialButtons = [
  {
    asset: assets.instagram,
    color: "#723AC8",
    onPress: (message: string) =>
      Linking.openURL(`instagram://share?text=${message}`),
  },
  {
    asset: assets.snapchat,
    color: "#DBB00B",
    onPress: (message: string) =>
      Linking.openURL(`snapchat://snap?text=${message}`),
  },
  {
    asset: assets.whatsapp,
    color: "#00DC60",
    onPress: (message: string) =>
      Share.shareSingle({
        title: "Shared on Whatsapp",
        social: Share.Social.WHATSAPP,
        message,
      }),
  },
  {
    asset: assets.message,
    color: "#37C501",
    onPress: (message: string) => Linking.openURL(`sms://send?text=${message}`),
  },
  {
    asset: assets.messenger,
    color: "#4C6AFF",
    onPress: (message: string) =>
      Linking.openURL(`fb-messenger://share?text=${message}`),
  },
  {
    asset: assets.others,
    color: "#3F3E3E",
    onPress: (message: string) =>
      ShareNative.share({
        message,
      }),
  },
];

export default socialButtons;
