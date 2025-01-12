import { differenceInDays, format, formatDistanceToNow } from "date-fns";

export const readableDate = (date: Date) => {
  return format(date, "dd MMMM yyyy");
};

export const onlyHours = (date: Date) => {
  return format(date, "HH:mm");
};

export const formatStoryDate = (date: Date) => {
  return formatDistanceToNow(date);
};

export const getDaysFromNow = (date: Date) => {
  return differenceInDays(new Date(), date);
};

export const formatBasicDate = (date: Date) => {
  return format(date, "dd/MM/yyyy");
};

export const formatPastCircleLittleDate = (date: Date) => {
  return format(date, "dd.MM");
};

export const formatPastCircleDate = (date: Date) => {
  return format(date, "d MMMM yyyy");
};

export const formatTime = (
  positionMillis: number,
  durationMillis: number,
): string => {
  const position = Math.floor(positionMillis / 1000);
  const duration = Math.floor(durationMillis / 1000);
  const minutes = Math.floor(position / 60);
  const seconds = position % 60;
  const durationMinutes = Math.floor(duration / 60);
  const durationSeconds = duration % 60;

  return `${minutes.toString().padStart(2, "0")}:${
    seconds
      .toString()
      .padStart(2, "0")
  } / ${durationMinutes.toString().padStart(2, "0")}:${
    durationSeconds
      .toString()
      .padStart(2, "0")
  }`;
};
