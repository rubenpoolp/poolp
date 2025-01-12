import MyPressable from "@components/natives/MyPressable";
import MyText from "@components/natives/MyText";
import changeLocale from "@utils/changeLocale";
import { getFlagEmoji, locales } from "@utils/i18n";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import MyModal from "./MyModal";

interface LanguageModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const LanguageModal = ({ isVisible, onClose }: LanguageModalProps) => {
  const { t, i18n } = useTranslation();

  const handleLanguageChange = async (lang: string) => {
    changeLocale(lang as locales);
    onClose();
  };

  return (
    <MyModal
      isVisible={isVisible}
      onBackdropPress={onClose}
      backdropOpacity={0.8}
    >
      <View className="bg-background-dark rounded-2xl p-6 w-[80%]">
        <MyText className="text-lg font-semibold text-center mb-4">
          {t("profile.selectLanguage")}
        </MyText>
        <View className="space-y-4">
          <MyPressable
            className="flex-row items-center space-x-2"
            onPress={() => handleLanguageChange("en")}
          >
            <MyText>{getFlagEmoji("en")} English</MyText>
          </MyPressable>
          <MyPressable
            className="flex-row items-center space-x-2"
            onPress={() => handleLanguageChange("fr")}
          >
            <MyText>{getFlagEmoji("fr")} Français</MyText>
          </MyPressable>
        </View>
      </View>
    </MyModal>
  );
};

export default LanguageModal;
