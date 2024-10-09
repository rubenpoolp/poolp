import sleep from "@utils/sleep";
import { ComponentProps, useEffect, useState } from "react";
import { Platform } from "react-native";
import Modal from "react-native-modal";

interface MyModalProps extends Partial<ComponentProps<typeof Modal>> {
  showAfterMs?: number;
  showInstantly?: boolean;
}

const MyModal = ({
  showAfterMs = 300,
  showInstantly,
  ...props
}: MyModalProps) => {
  const [isVisibleWithTimer, setIsVisibleWithTimer] = useState(false);

  useEffect(() => {
    if (props.isVisible) {
      if (showInstantly) setIsVisibleWithTimer(true);
      else sleep(showAfterMs).then(() => setIsVisibleWithTimer(true)); // On affiche le modal après un délai pour éviter qu'on est 2 modals en même temps et donc qu'une ne s'affiche pas
    } else setIsVisibleWithTimer(false);
  }, [showAfterMs, showInstantly, props.isVisible]);

  return (
    <Modal
      animationIn={"fadeIn"}
      animationOut={"fadeOut"}
      backdropOpacity={0.2}
      animationInTiming={200}
      animationOutTiming={200}
      statusBarTranslucent={Platform.OS === "ios"} // Only on iOS because with it, on Android the modal does not cover the bottom screen
      {...props}
      isVisible={props.isVisible && isVisibleWithTimer}
      style={[
        { margin: 0, alignItems: "center", paddingBottom: 0, marginBottom: 0 },
        props.style,
      ]}
    >
      {props.children}
    </Modal>
  );
};

export default MyModal;
