import { ReactNode } from "react";
import { View } from "react-native";
import MyButton from "../natives/MyButton";
import MyText from "../natives/MyText";
import ModalTemplate from "./MyModal";

interface BasicModalProps {
  title: string;
  description?: string;
  isVisible: boolean;
  txtButtonLeft?: string;
  txtButtonRight?: string;
  onPressRight?: () => void;
  onPressLeft?: () => void;
  ComponentOnTop?: ReactNode;
  showInstantly?: boolean;
}

const BasicModal = ({
  title,
  description,
  isVisible,
  txtButtonLeft,
  txtButtonRight,
  onPressRight,
  onPressLeft,
  ComponentOnTop,
  showInstantly,
}: BasicModalProps) => {
  return (
    <ModalTemplate showInstantly={showInstantly} isVisible={isVisible}>
      {ComponentOnTop}
      <MyText className="text-3xl mb-5 text-center font-semibold">
        {title}
      </MyText>
      {description && <MyText className="mb-5 text-base">{description}</MyText>}
      <View className="w-full flex-row">
        {onPressLeft && (
          <View className="mr-2 flex-1">
            <MyButton
              className="text-sm"
              onPress={onPressLeft}
              type={"secondary"}
              txt={txtButtonLeft ? txtButtonLeft : "Annuler"}
            />
          </View>
        )}
        {onPressRight && (
          <View className="flex-1">
            <MyButton
              className="text-sm w-full"
              onPress={onPressRight}
              txt={txtButtonRight ? txtButtonRight : "OK"}
            />
          </View>
        )}
      </View>
    </ModalTemplate>
  );
};

export default BasicModal;
