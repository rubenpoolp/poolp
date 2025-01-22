import { format } from "date-fns";
import { getAsyncStorage, setAsyncStorage } from "./asyncStorage";

export const setDateLastCircleReviewed = () => {
  setAsyncStorage("USER_REVIEWED_CIRCLE_DATE", format(new Date(), "t"));
};

export const getDateLastCircleReviewed = async () => {
  const date = await getAsyncStorage("USER_REVIEWED_CIRCLE_DATE");
  return date ? date : null;
};

export const setDateLastTimeWentOnCircle = (timestamp?: number) => {
  setAsyncStorage("USER_LAST_TIME_WENT_ON_CIRCLE", format(timestamp ? new Date(timestamp) : new Date(), "t"));
};

export const getDateLastTimeWentOnCircle = async () => {
  const date = await getAsyncStorage("USER_LAST_TIME_WENT_ON_CIRCLE");
  return date ? date : null;
};