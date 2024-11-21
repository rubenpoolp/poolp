import { format } from "date-fns";
import { getAsyncStorage, setAsyncStorage } from "./asyncStorage";

export const setDateLastCircleReviewed = () => {
  setAsyncStorage("USER_REVIEWED_CIRCLE_DATE", format(new Date(), "t"));
};

export const getDateLastCircleReviewed = async () => {
  return await getAsyncStorage("USER_REVIEWED_CIRCLE_DATE");
};

export const setDateLastTimeWentOnCircle = () => {
  setAsyncStorage("USER_LAST_TIME_WENT_ON_CIRCLE", format(new Date(), "t"));
};

export const getDateLastTimeWentOnCircle = async () => {
  return await getAsyncStorage("USER_LAST_TIME_WENT_ON_CIRCLE");
};