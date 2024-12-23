import useBlockUser from "@api/blocks/blockUser.hook";
import useRingUser from "@api/notifications/ringUser.hook";
import { useActionSheet } from "@expo/react-native-action-sheet";
import sleep from "@utils/sleep";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert } from "react-native";

const useActionSheetOnUser = () => {
  const [isReportModalVisible, setIsReportModalVisible] = useState(false);
  const { showActionSheetWithOptions } = useActionSheet();
  const { t } = useTranslation();
  const ringUser = useRingUser();
  const blockUser = useBlockUser();

  const onPress = (userId: string) => {
    const options = [
      t("actions.block"),
      t("actions.report"),
      t("actions.reportHisContent"),
      t("actions.ring"),
      t("actions.cancel"),
    ];
    const cancelButtonIndex = 4;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      (selectedIndex?: number) => {
        switch (selectedIndex) {
          case 0:
            blockUser.mutate(userId);
            break;
          case 1:
            setIsReportModalVisible(true);
            break;
          case 2:
            sleep(1000).then(() => {
              Alert.alert(
                "Content has been reported and will be reviewed shortly",
              );
            });
            break;
          case 3:
            ringUser.mutate({ userId });
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
