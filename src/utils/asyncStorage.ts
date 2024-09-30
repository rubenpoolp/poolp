import AsyncStorage from "@react-native-async-storage/async-storage";

export const getAsyncStorage = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (e) {
    console.error("Error while getting AsyncStorage", e);
  }
};

export const setAsyncStorage = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.error("Error while setting AsyncStorage", e);
  }
};
