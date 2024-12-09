import useUpdate from "@hooks/useUpdate";
import { useTranslation } from "react-i18next";
import BasicModal from "./BasicModal";

const UpdateModal = () => {
  const { updateType, showModal, handleUpdatePress, isLoading } = useUpdate();
  const { t } = useTranslation();

  return (
    <BasicModal
      isVisible={!showModal}
      title={t("updateModal.title")}
      description={
        updateType === "store"
          ? t("updateModal.descriptionStore")
          : t("updateModal.descriptionAppStore")
      }
      txtButtonRight={
        updateType === "store"
          ? t("updateModal.update")
          : isLoading
            ? t("updateModal.loading")
            : t("updateModal.ok")
      }
      onPressRight={handleUpdatePress}
    />
  );
};

export default UpdateModal;
