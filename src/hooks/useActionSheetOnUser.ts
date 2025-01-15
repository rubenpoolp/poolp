import useBlockUser from "@api/blocks/blockUser.hook";
import useRingUser from "@api/notifications/ringUser.hook";
import { useActionSheet } from "@expo/react-native-action-sheet";
import sleep from "@utils/sleep";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert } from "react-native";

const useActionSheetOnUser = (canReportContent: boolean = true) => {
  const [isReportModalVisible, setIsReportModalVisible] = useState(false);
  const { showActionSheetWithOptions } = useActionSheet();
  const { t } = useTranslation();
  const ringUser = useRingUser();
  const blockUser = useBlockUser();

  const onPress = (userId: string) => {
    const options = [
      t("actions.ring"),
      t("actions.block"),
      t("actions.report"),
      canReportContent ? t("actions.reportHisContent") : null,
      t("actions.cancel"),
    ];
    const cancelButtonIndex = canReportContent ? 4 : 3;

    showActionSheetWithOptions(
      {
        options: options.filter((option) => option !== null),
        cancelButtonIndex,
        destructiveButtonIndex: [1, 2, canReportContent ? 3 : 2],
      },
      (selectedIndex?: number) => {
        switch (selectedIndex) {
          case 0:
            if (canReportContent) {
              ringUser.mutate({ userId });
            }
            break;
          case 1:
            blockUser.mutate(userId);
            break;
          case 2:
            setIsReportModalVisible(true);
            break;
          case 3:
            if (canReportContent) {
              sleep(1000).then(() => {
                Alert.alert(
                  "Content has been reported and will be reviewed shortly",
                );
              });
              return;
            }
            break;
          case cancelButtonIndex:
            break;
        }
      },
    );
  };

  return { onPress, isReportModalVisible, setIsReportModalVisible };
};

export default useActionSheetOnUser;
