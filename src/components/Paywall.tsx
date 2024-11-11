import assets from "@assets/index";
import colors from "@config/colors";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import { hapticImpact } from "@utils/haptics";
import { t } from "i18next";
import { useEffect, useRef, useState } from "react";
import { Image, Linking, View } from "react-native";
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
  const [selectedPlan, setSelectedPlan] = useState("month");
  const navigation = useNavigation();

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

  const onPress = () => {
    hapticImpact("medium");
    bottomSheetRef.current?.dismiss();
    onClose();
    navigation.navigate("DiscoverPeople");
  };

  const openTerms = () => {
    Linking.openURL("https://unblur.app");
  };

  return (
    <>
      <Hearts isVisible={isVisible} />

      <BottomSheetModal
        enablePanDownToClose
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
              isSelected={selectedPlan === "month"}
              onSelect={() => setSelectedPlan("month")}
              period={t("paywall.month")}
              price={t("paywall.dayPrice", {
                price: "€0,13",
              })}
              isBestValue={true}
            />

            <PaywallPlan
              isSelected={selectedPlan === "week"}
              onSelect={() => setSelectedPlan("week")}
              period={t("paywall.week")}
              price={t("paywall.dayPrice", {
                price: "€0,28",
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
            onPress={onPress}
            txtClassName="font-bold"
            txt={t("paywall.button")}
          />
          <MyText className="text-center mt-1 text-sm mb-2">
            {t("paywall.monthPrice", {
              price: selectedPlan === "month" ? "€4,03" : "€8,68",
            })}
          </MyText>
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
};

export default Paywall;
