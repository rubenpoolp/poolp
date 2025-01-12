import LanguageModal from "@components/modals/LanguageModal";
import MyPressable from "@components/natives/MyPressable";
import MyText from "@components/natives/MyText";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const MyChangeLanguageButton = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { i18n } = useTranslation();

  return (
    <>
      <MyPressable className="pr-4" onPress={() => setIsModalVisible(true)}>
        <MyText>{i18n.language.includes("en") ? "🇬🇧" : "🇫🇷"}</MyText>
      </MyPressable>
      <LanguageModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
    </>
  );
};

export default MyChangeLanguageButton;
