import * as Localization from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Importez ici vos fichiers de traduction
import en from "@locales/en.json";
// import fr from '@locales/fr.json;

const resources = {
  en: { translation: en },
  // fr: { translation: fr },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: Localization.locale,
    fallbackLng: "en",
    compatibilityJSON: "v3",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

export const getFlagEmoji = (countryCode: string) => {
  if (!countryCode || typeof countryCode !== "string") return "";

  const code = countryCode === "en" ? "gb" : countryCode;
  const codePoints = code
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
};
