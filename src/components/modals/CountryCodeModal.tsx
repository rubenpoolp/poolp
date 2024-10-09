import { getFlagEmoji } from "@utils/i18n";
// import { normalizeAccents } from "@/utils/string";
// import { black } from "@constants/colors";
import MyTextInput from "@components/inputs/MyTextInput";
import MyScreen from "@components/MyScreen";
import MyPressable from "@components/natives/MyPressable";
import MyText from "@components/natives/MyText";
import { background } from "@config/colors";
import { t } from "i18next";
import {
  CountryCode,
  getCountries,
  getCountryCallingCode,
} from "libphonenumber-js";
import { Check } from "phosphor-react-native";
import { useState } from "react";
import { FlatList } from "react-native";
import MyModal from "./MyModal";

interface CountryCodeModalProps {
  isVisible: boolean;
  countryCode: CountryCode;
  setCountryCode: (countryCode: CountryCode) => void;
  resetValue: () => void;
  onClose: () => void;
}

const CountryCodeModal = ({
  isVisible,
  countryCode,
  setCountryCode,
  resetValue,
  onClose,
}: CountryCodeModalProps) => {
  const countryCodes = getCountries();
  const [search, setSearch] = useState("");

  const countries = countryCodes.map((code) => {
    return {
      code,
      prefix: `+${getCountryCallingCode(code)}`,
      name: t(`countries:${code}` as any),
      flag: getFlagEmoji(code),
    };
  });

  const sortedCountries = countries.sort((a, b) =>
    a.name.localeCompare(b.name),
  );

  const filterCountries = sortedCountries.filter(
    (country) =>
      // normalizeAccents(country.name).includes(normalizeAccents(search)),
      country,
  );

  const onSelectCountryCode = (newCode: CountryCode) => {
    if (newCode !== countryCode) resetValue();
    setCountryCode(newCode);
    onClose();
  };

  return (
    <MyModal
      animationIn={"slideInUp"}
      animationOut={"slideOutDown"}
      isVisible={isVisible}
    >
      <MyScreen>
        <MyTextInput
          className="w-full text-3xl mb-4"
          placeholder={t("inputs.search")}
          autoCapitalize="sentences"
          value={search}
          onChangeText={setSearch}
          autoFocus
        />
        <FlatList
          className="flex-1 w-full"
          data={filterCountries}
          keyboardShouldPersistTaps="always"
          renderItem={({ item }) => (
            <MyPressable
              className="py-1 flex-row items-center justify-between w-full"
              onPress={() => onSelectCountryCode(item.code)}
            >
              <MyText
                className={`${countryCode === item.code && "font-semibold"}`}
              >
                {`${item.flag} ${item.name} `}
                <MyText className="text-gray-300">{item.prefix}</MyText>
              </MyText>
              {countryCode === item.code && <Check color={background.light} />}
            </MyPressable>
          )}
        />
      </MyScreen>
    </MyModal>
  );
};

export default CountryCodeModal;
