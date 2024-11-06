import { CIRCLE_PICS_BUCKET, PROFILE_PICS_BUCKET } from "@supabase_types";
import { getAsyncStorage } from "./asyncStorage";

const concatStorageUrl = (...args: string[]) => {
  // if last character is /, remove it
  return args.map((arg) => arg.replace(/\/$/, "")).join("/");
};

const getProfilePicsStorageUrl = async (...args: string[]) => {
  const storageUrl = await getAsyncStorage("STORAGE_URL");

  if (!storageUrl) {
    throw new Error("Storage url failed to load from AsyncStorage");
  }
  return concatStorageUrl(storageUrl, PROFILE_PICS_BUCKET, ...args);
};

const getCirclePicsStorageUrl = async (...args: string[]) => {
  const storageUrl = await getAsyncStorage("STORAGE_URL");

  if (!storageUrl) {
    throw new Error("Storage url failed to load from AsyncStorage");
  }
  return concatStorageUrl(storageUrl, CIRCLE_PICS_BUCKET, ...args);
};

export { getCirclePicsStorageUrl, getProfilePicsStorageUrl };
