import useDeleteCirclePic from "@api/circles/deleteCirclePic.hook";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { useTranslation } from "react-i18next";

const useActionSheetOnSelfUser = () => {
  const { showActionSheetWithOptions } = useActionSheet();
  const { t } = useTranslation();
  const { mutate: deleteCirclePic } = useDeleteCirclePic();

  const onPress = (circleId: string, circlePicId: string, onDeleteAction: () => void) => {
    const options = [
      t("actions.delete"),
      t("actions.cancel"),
    ];
    const cancelButtonIndex = 1;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      (selectedIndex?: number) => {
        switch (selectedIndex) {
          case 0:
            deleteCirclePic({ circlePicId: circlePicId, circleId: circleId });
            onDeleteAction();
            break;
          case cancelButtonIndex:
            break;
        }
      },
    );
  };

  return { onPress };
};

export default useActionSheetOnSelfUser;
