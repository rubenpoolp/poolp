import { Alert, Platform } from "react-native";
import Purchases, { LOG_LEVEL, PurchasesPackage } from "react-native-purchases";
import getCurrencySymbolFromPrice from "./getCurrencySymbolFromPrice";

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

      let nbMonths = 3;
      switch (p.packageType) {
        case "MONTHLY":
          nbMonths = 1;
          break;
        case "THREE_MONTH":
          nbMonths = 3;
          break;
        case "ANNUAL":
          nbMonths = 12;
          break;
        default:
          nbMonths = 1;
          break;
      }

      return {
        ...p,
        nbMonths,
        priceString: `${
          Number(p.product.price).toFixed(
            2,
          )
        }${characterCurrency}`,
        priceByMonthString: `${
          (p.product.price / nbMonths)
            .toFixed(3)
            .slice(0, -1)
        }${characterCurrency}`,
      };
    });
  } catch (error: any) {
    console.error("Error in getPackages:", error, error.code);
  }
};

const t = (key: string) => key;

export const pay = async (
  selectedPackage: PurchasesPackage,
  onSuccess: () => void,
) => {
  return Purchases.purchasePackage(selectedPackage)
    .then(({ customerInfo }) => {
      if (customerInfo.entitlements.all["Subscription"]?.isActive) {
        Alert.alert(
          "Bravo",
          "Tu as souscrit à l'abonnement, tu peux maintenant profiter de toutes les fonctionnalités de l'application",
          [
            {
              text: "OK",
              onPress: onSuccess,
            },
          ],
        );
      } else {
        Alert.alert(
          "Erreur",
          "Une erreur est survenue lors de la souscription à l'abonnement, nous en sommes informer. Tu peux réessayer plus tard.",
        );
      }
    })
    .catch((error: any) => {
      console.warn("ERROR", error);
      if (error.message.includes("cancel")) return;

      Alert.alert(
        t("account:payment.failure"),
        t("account:payment.failureMessage"),
      );
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
