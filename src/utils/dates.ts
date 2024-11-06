import { differenceInDays, format, formatDistanceToNow } from "date-fns";
import { enUS } from "date-fns/locale";

export const readableDate = (date: Date) => {
  return format(date, "dd MMMM yyyy", { locale: enUS });
};

export const onlyHours = (date: Date) => {
  return format(date, "HH:mm", { locale: enUS });
};

export const formatStoryDate = (date: Date) => {
  return formatDistanceToNow(date, { locale: enUS });
};

export const getDaysFromNow = (date: Date) => {
  return differenceInDays(new Date(), date);
};

export const formatBasicDate = (date: Date) => {
  return format(date, "dd/MM/yyyy", { locale: enUS });
};
