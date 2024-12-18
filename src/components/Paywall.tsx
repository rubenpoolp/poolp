import assets from "@assets/index";
import colors from "@config/colors";
import { TERMS_URL } from "@config/config";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import usePayment from "@hooks/usePayment";
import { useNavigation } from "@react-navigation/native";
import { hapticImpact } from "@utils/haptics";
import i18n from "@utils/i18n";
import { myCaptureException } from "@utils/sentry";
import { t } from "i18next";
import { useEffect, useRef, useState } from "react";
import { Alert, Image, Linking, View } from "react-native";
import { PACKAGE_TYPE } from "react-native-purchases";
import Hearts from "./animations/Hearts";
import MyButton from "./natives/MyButton";
import MyPressable from "./natives/MyPressable";
import MyText from "./natives/MyText";
import PaywallFeatures from "./paywall/PaywallFeatures";
import PaywallPlan from "./paywall/PaywallPlan";

const Paywall = ({
  isVisible,
  onClose,
}: {
  isVisible: boolean;
  onClose: () => void;
}) => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [selectedPlan, setSelectedPlan] = useState("monthly");
  const navigation = useNavigation();
  const { packages, purchase } = usePayment();
  const monthPackage = packages.find((p: any) => p.packageType === "MONTHLY");
  const weekPackage = packages.find((p: any) => p.packageType === "WEEKLY");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isVisible) {
      hapticImpact("heavy");
      setTimeout(() => {
        bottomSheetRef.current?.present();
      }, 1200);
    } else {
      bottomSheetRef.current?.dismiss();
    }
  }, [isVisible]);

  const handleDismiss = () => {
    onClose();
  };

  const onPress = async () => {
    hapticImpact("medium");
    setIsLoading(true);
    const result = await purchase(
      selectedPlan === "monthly" ? PACKAGE_TYPE.MONTHLY : PACKAGE_TYPE.WEEKLY,
    );
    setIsLoading(false);
    if (result.isSuccess) {
      Alert.alert(
        i18n.t("paywall.successTitle"),
        i18n.t("paywall.successMessage"),
        [
          {
            text: "OK",
            onPress: () => {
              bottomSheetRef.current?.dismiss();
              onClose();
              navigation.navigate("WhoLikedYou");
            },
          },
        ],
      );
    } else {
      if ("error" in result) {
        myCaptureException(result.error);
        Alert.alert(
          i18n.t("paywall.errorTitle"),
          i18n.t("paywall.errorMessage"),
        );
      }
    }
  };

  const openTerms = () => {
    Linking.openURL(TERMS_URL);
  };

  return (
    <>
      <Hearts isVisible={isVisible} />

      <BottomSheetModal
        enablePanDownToClose={!isLoading}
        ref={bottomSheetRef}
        backgroundStyle={{ backgroundColor: colors.background.gold }}
        handleIndicatorStyle={{ backgroundColor: colors.gray[600] }}
        onDismiss={handleDismiss}
      >
        <BottomSheetView style={{ paddingHorizontal: 16, paddingBottom: 24 }}>
          <Image
            source={assets.logoPlus}
            className="h-32 self-center mt-4 mb-8"
            resizeMode="contain"
          />
          <PaywallFeatures />

          <View>
            <PaywallPlan
              isSelected={selectedPlan === "monthly"}
              onSelect={() => setSelectedPlan("monthly")}
              period={t("paywall.month")}
              price={t("paywall.monthPrice", {
                price: monthPackage?.price,
              })}
              isBestValue={true}
            />
            <PaywallPlan
              isSelected={selectedPlan === "weekly"}
              onSelect={() => setSelectedPlan("weekly")}
              period={t("paywall.week")}
              price={t("paywall.weekPrice", {
                price: weekPackage?.price,
              })}
            />
          </View>
          <View className="flex-row justify-center items-baseline mb-4 mt-1">
            <MyText className="text-center text-xs text-gray-400 font-regular mr-0.5">
              {t("paywall.recurring")}
            </MyText>
            <MyPressable onPress={openTerms}>
              <MyText className=" font-regular text-gray-400 text-xs font-semibold">
                {t("paywall.terms")}
              </MyText>
            </MyPressable>
          </View>
          <MyButton
            variant="gold"
            size="large"
            disabled={isLoading}
            onPress={onPress}
            txtClassName="font-bold"
            txt={isLoading ? "Loading..." : t("paywall.button")}
          />
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
};

export default Paywall;
