import { Platform } from "react-native";
import Purchases, { LOG_LEVEL, PurchasesPackage } from "react-native-purchases";
import getCurrencySymbolFromPrice from "./getCurrencySymbolFromPrice";
import { myCaptureException } from "./sentry";

const APIKeys = {
  apple: process.env.REVENUE_CAT_IOS_KEY ?? "",
  google: process.env.REVENUE_CAT_ANDROID_KEY ?? "",
};

export const initializeRevenueCatApiKeys = (userId: string): void => {
  Purchases.setLogLevel(__DEV__ ? LOG_LEVEL.DEBUG : LOG_LEVEL.INFO);
  Purchases.configure({
    apiKey: Platform.OS === "android" ? APIKeys.google : APIKeys.apple,
    appUserID: userId,
  });
};

export const logInRevenueCat = async (
  userId: string,
  userEmail?: string,
): Promise<void> => {
  await Purchases.logIn(userId);
  if (userEmail) {
    await Purchases.setAttributes({
      email: userEmail,
    });
  }
};

export const getPackages = async () => {
  try {
    const offerings = await Purchases.getOfferings();
    const currentOffering = offerings?.current;

    if (!offerings || !currentOffering?.availablePackages) return [];

    return currentOffering.availablePackages.map((p) => {
      const characterCurrency = getCurrencySymbolFromPrice(
        p.product.priceString,
      );

      const nbDays = p.packageType === "MONTHLY" ? 30 : 7;

      return {
        ...p,
        priceString: `${
          Number(p.product.price).toFixed(
            2,
          )
        }${characterCurrency}`,
        priceByDayString: `${
          (p.product.price / nbDays)
            .toFixed(3)
            .slice(0, -1)
        }${characterCurrency}`,
      };
    });
  } catch (error: any) {
    console.error("Error in getPackages:", error, error.code);
    myCaptureException(error);
  }
};

export const pay = async (selectedPackage: PurchasesPackage) => {
  return await Purchases.purchasePackage(selectedPackage)
    .then(({ customerInfo }) => {
      if (customerInfo.entitlements.all["Subscription"]?.isActive) {
        return { isSuccess: true };
      } else {
        return { isSuccess: false };
      }
    })
    .catch((error: any) => {
      if (error.message.includes("cancel")) return { isSuccess: false };
      myCaptureException(error);
      myCaptureException(error.message);

      return { isSuccess: false, error: error.message };
    });
};

export const getIsSubscribed = async (): Promise<boolean> => {
  try {
    const purchaserInfo = await Purchases.getCustomerInfo();
    return purchaserInfo.entitlements.all["Subscription"]?.isActive ?? false;
  } catch (error: any) {
    console.error("Error in getIsSubscribed:", error, error.code);
    return false;
  }
};
