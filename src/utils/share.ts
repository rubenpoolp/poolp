import { Share } from "react-native";
import i18n from "./i18n";

export const shareToInviteFriends = (text?: string) => {
  const message =
    i18n.t(
      text && typeof text === "string" ? text : "utils.messageInviteFriends",
    ) +
    " https://www.poolp.app";
  Share.share({
    message,
  })
    .then(() => {
    })
    .catch(() => {
    });
};
