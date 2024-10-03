import * as Haptics from "expo-haptics";

export const hapticSelection = () => {
  Haptics.selectionAsync();
};

export type HapticImpactStyle = "light" | "medium" | "heavy" | "soft" | "rigid";

export const hapticImpact = (style: HapticImpactStyle) => {
  let styleFormatted = Haptics.ImpactFeedbackStyle.Light;

  switch (style) {
    case "light":
      styleFormatted = Haptics.ImpactFeedbackStyle.Light;
      break;
    case "medium":
      styleFormatted = Haptics.ImpactFeedbackStyle.Medium;
      break;
    case "heavy":
      styleFormatted = Haptics.ImpactFeedbackStyle.Heavy;
      break;
    case "soft":
      styleFormatted = Haptics.ImpactFeedbackStyle.Soft;
      break;
    case "rigid":
      styleFormatted = Haptics.ImpactFeedbackStyle.Rigid;
      break;
  }

  Haptics.impactAsync(styleFormatted);
};
