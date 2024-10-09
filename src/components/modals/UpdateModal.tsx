import useUpdate from "@hooks/useUpdate";
import BasicModal from "./BasicModal";

const UpdateModal = () => {
  const { updateType, showModal, handleUpdatePress, isLoading } = useUpdate();

  return (
    <BasicModal
      isVisible={showModal}
      title={"Mise à jour disponible"}
      description={
        updateType === "store"
          ? "Veuillez la télécharger pour continuer à utiliser l'application."
          : "Veuillez patienter pendant le téléchargement de la mise à jour."
      }
      txtButtonRight={
        updateType === "store"
          ? "Mettre à jour"
          : isLoading
            ? "Chargement"
            : "OK"
      }
      onPressRight={handleUpdatePress}
    />
  );
};

export default UpdateModal;
