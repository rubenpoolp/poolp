import { Share } from "react-native";
import i18n from "./i18n";

export const shareToInviteFriends = () => {
  const message = i18n.t("utils.messageInviteFriends");
  Share.share({
    message,
  })
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });
};
