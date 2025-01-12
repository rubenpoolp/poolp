import i18n, { LanguageDetectorAsyncModule } from "i18next";
import { initReactI18next } from "react-i18next";

import enCommon from "@/locales/en.json";
import frCommon from "@/locales/fr.json";

import {
  deleteAsyncStorage,
  getAsyncStorage,
  setAsyncStorage,
} from "@/utils/asyncStorage";
import { changeDateLocale } from "@/utils/changeLocale";
import { getLocales } from "expo-localization";

export type locales = "fr" | "en";

export const defaultNS = "common";
export const defaultLocale: locales = "en";
export const supportedLocales: locales[] = ["en", "fr"];

export const detectLanguage = async () => {
  const storedLocale = await getAsyncStorage("locale");
  const deviceLocale = getLocales()[0].languageCode || defaultLocale;
  if (!storedLocale) {
    if (deviceLocale && supportedLocales.includes(deviceLocale as locales)) {
      await setAsyncStorage("locale", deviceLocale);
      changeDateLocale(deviceLocale as locales);
      return deviceLocale;
    }
    changeDateLocale(defaultLocale);

    return defaultLocale;
  }

  if (supportedLocales.includes(storedLocale as locales)) {
    changeDateLocale(storedLocale as locales);
    return storedLocale;
  }

  changeDateLocale(defaultLocale);
  await deleteAsyncStorage("locale"); // leave opportunity to detect languages that will be supported in the future
  return defaultLocale;
};

export const getFlagEmoji = (countryCode: string) => {
  if (!countryCode || typeof countryCode !== "string") return "";

  const code = countryCode === "en" ? "gb" : countryCode;
  const codePoints = code
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
};

const LanguageDetector: LanguageDetectorAsyncModule = {
  type: "languageDetector",
  async: true,
  detect: detectLanguage,
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: "v3",
    defaultNS,
    resources: {
      fr: {
        common: frCommon,
      },
      en: {
        common: enCommon,
      },
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
