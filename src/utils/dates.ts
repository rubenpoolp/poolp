import { format } from "date-fns";
import { fr } from "date-fns/locale";

export const readableDate = (date: Date) => {
  return format(date, "dd MMMM yyyy", { locale: fr });
};

export const onlyHours = (date: Date) => {
  return format(date, "HH:mm", { locale: fr });
};
