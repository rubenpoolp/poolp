import { getFlagEmoji } from "@src/utils/i18n";
// import { normalizeAccents } from "@/utils/string";
// import { black } from "@src/constants/colors";
import { Check } from "phosphor-react-native";
import { t } from "i18next";
import {
  CountryCode,
  getCountries,
  getCountryCallingCode,
} from "libphonenumber-js";
import { useState } from "react";
import { FlatList } from "react-native";
import MyPressable from "@src/components/natives/MyPressable";
import MyText from "@src/components/natives/MyText";
import MyModal from "./MyModal";
import { background } from "@config/colors";
import MyTextInput from "@src/components/inputs/MyTextInput";
import ScreenTemplate from "../templates/ScreenTemplate";

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
      <ScreenTemplate>
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
      </ScreenTemplate>
    </MyModal>
  );
};

export default CountryCodeModal;
