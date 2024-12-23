import useSendReport from "@api/reports/sendReport.hook";
import CloseModalButton from "@components/buttons/CloseModalButton";
import MyTextAreaInput from "@components/inputs/MyTextAreaInput";
import MyScreen from "@components/MyScreen";
import MyButton from "@components/natives/MyButton";
import MyText from "@components/natives/MyText";
import { CaretRight } from "phosphor-react-native";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Platform, Pressable, SafeAreaView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MyModal from "./MyModal";

interface ReportModalProps {
  isVisible: boolean;
  onClose: () => void;
  toUserId: string;
}

const ReportModal = ({ isVisible, onClose, toUserId }: ReportModalProps) => {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  const handleDismiss = () => {
    onClose();
  };
  const reasons = t("reportModal.reportReasons", {
    returnObjects: true,
  }) as string[];
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [description, setDescription] = useState<string>("");

  const { mutate: sendReport, isSuccess } = useSendReport();

  const handleSelectReason = (reason: string) => {
    setSelectedReason(reason);
  };

  const handleSendReport = () => {
    if (!toUserId || !selectedReason) {
      return;
    }

    sendReport({
      to_user_id: toUserId,
      reason: selectedReason,
      description: description,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      setSelectedReason(null);
      setDescription("");
      onClose();
    }
  }, [isSuccess]);

  return (
    <MyModal
      isVisible={isVisible}
      className="flex-1"
      animationIn="slideInUp"
      animationOut="slideOutDown"
    >
      <MyScreen className="w-screen">
        <SafeAreaView
          style={{
            flex: 1,
            paddingTop: Platform.OS === "ios" ? insets.top : 0,
          }}
        >
          <View className="flex-1">
            <View className="flex-row justify-between mb-2 w-full px-2">
              <View className="w-14">
                <CloseModalButton onPress={handleDismiss} />
              </View>
              <MyText className="text-2xl font-semibold mb-5">
                {t("actions.report")}
              </MyText>
              <View className="w-14" />
            </View>

            <View className="justify-center items-center px-6">
              <MyText className="font-semibold text-center">
                {t("reportModal.description")}
              </MyText>
              <MyText className="text-gray-400 text-center text-xs">
                {t("reportModal.subDescription")}
              </MyText>
            </View>

            <View className="mt-10">
              {!selectedReason &&
                reasons.map((reason) => (
                  <View
                    key={reason}
                    className="flex-row items-center h-12 border-b border-gray-500 pb-2"
                  >
                    <Pressable
                      className="flex-row items-end px-6 justify-between w-full pt-1"
                      onPress={() => handleSelectReason(reason)}
                    >
                      <MyText>{reason}</MyText>
                      <CaretRight size={16} />
                    </Pressable>
                  </View>
                ))}

              {selectedReason && (
                <View className="px-6">
                  <View className="bg-light rounded-xl px-3 py-2 mb-4">
                    <MyText className="text-background-dark text-sm">
                      {selectedReason}
                    </MyText>
                  </View>
                  <MyTextAreaInput
                    placeholder={t("reportModal.addMoreDetails")}
                    value={description}
                    onChangeText={setDescription}
                  />
                </View>
              )}
            </View>
          </View>

          {selectedReason && (
            <View className="absolute bottom-10 w-full px-6">
              <MyButton txt={t("actions.send")} onPress={handleSendReport} />
            </View>
          )}
        </SafeAreaView>
      </MyScreen>
    </MyModal>
  );
};

export default ReportModal;
