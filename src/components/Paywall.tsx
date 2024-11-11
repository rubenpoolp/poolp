import assets from "@assets/index";
import colors from "@config/colors";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { hapticImpact } from "@utils/haptics";
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

  useEffect(() => {
    if (isVisible) {
      hapticImpact("heavy");
      setTimeout(() => {
        bottomSheetRef.current?.present();
      }, 2000);
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
              period="1 month"
              price="€0,13/day"
              isBestValue={true}
            />

            <PaywallPlan
              isSelected={selectedPlan === "week"}
              onSelect={() => setSelectedPlan("week")}
              period="1 week"
              price="€0,28/day"
            />
          </View>
          <MyPressable onPress={() => Linking.openURL("https://unblur.app")}>
            <MyText className="text-center mb-2 text-xs text-gray-400 font-regular">
              Recurring billing. Cancel anytime. Terms & Privacy
            </MyText>
          </MyPressable>
          <MyButton
            variant="gold"
            size="large"
            onPress={onPress}
            txtClassName="font-bold"
            txt="UNBLUR NOW 👀"
          />
          <MyText className="text-center mt-1 text-sm mb-2">
            {`${selectedPlan === "month" ? "€4,03" : "€8,68"}/month`}
          </MyText>
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
};

export default Paywall;
