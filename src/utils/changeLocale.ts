import { locales } from "@/utils/i18n";
import { captureException } from "@sentry/react-native";
import { setDefaultOptions } from "date-fns";
import { enUS, fr } from "date-fns/locale";
import { changeLanguage } from "i18next";
import { setAsyncStorage } from "./asyncStorage";

export const changeDateLocale = (newLocale: locales) => {
  setDefaultOptions({ locale: newLocale === "fr" ? fr : enUS });
};

const changeLocale = async (newLocale: locales) => {
  await setAsyncStorage("locale", newLocale);
  changeLanguage(newLocale, (err) => {
    if (err) {
      captureException(err);
      console.warn("Something went wrong when changing language", err);
    }
  });
  // change locale date-fns
  changeDateLocale(newLocale);
};

export default changeLocale;
