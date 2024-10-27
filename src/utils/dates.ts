import { format, formatDistanceToNow } from "date-fns";
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
