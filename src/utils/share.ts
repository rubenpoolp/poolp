import { Share } from "react-native";
import i18n from "./i18n";

export const shareToInviteFriends = () => {
  const message = i18n.t("utils.messageInviteFriends") +
    " https://www.poolp.app";
  Share.share({
    message,
  })
    .then(() => {
    })
    .catch(() => {
    });
};
