import CloseModalButton from "@components/buttons/CloseModalButton";
import MySearchInput from "@components/inputs/MySearchInput";
import MyModal from "@components/modals/MyModal";
import MyScreen from "@components/MyScreen";
import MyPressable from "@components/natives/MyPressable";
import MyText from "@components/natives/MyText";
import { background } from "@config/colors";
import { getFlagEmoji } from "@utils/i18n";
import { t } from "i18next";
import {
  CountryCode,
  getCountries,
  getCountryCallingCode,
} from "libphonenumber-js";
import { Check } from "phosphor-react-native";
import React, { useMemo, useState } from "react";
import { FlatList, Platform, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

interface CountryCodeModalProps {
  isVisible: boolean;
  onClose: () => void;

  countryCode: CountryCode;
  setCountryCode: (countryCode: CountryCode) => void;
  resetValue: () => void;
}

const CountryCodeModal = ({
  isVisible,
  onClose,
  countryCode,
  setCountryCode,
  resetValue,
}: CountryCodeModalProps) => {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState("");

  const countryCodes = getCountries();

  const countries = useMemo(() => {
    return countryCodes.map((code) => ({
      code,
      prefix: `+${getCountryCallingCode(code)}`,
      name: t(`countries:${code}` as any),
      flag: getFlagEmoji(code),
    }));
  }, []);

  const filteredCountries = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    return countries.filter(
      (country) =>
        country.name.toLowerCase().includes(query) ||
        country.prefix.includes(query),
    );
  }, [countries, searchQuery]);

  const onSelectCountryCode = (newCode: CountryCode) => {
    if (newCode !== countryCode) resetValue();
    setCountryCode(newCode);
    resetValue();
    setSearchQuery("");
    onClose();
  };

  return (
    <MyModal
      isVisible={isVisible}
      className="flex-1"
      animationIn="slideInUp"
      animationOut="slideOutDown"
    >
      <MyScreen padding>
        <SafeAreaView
          style={{
            flex: 1,
            paddingTop: Platform.OS === "ios" ? insets.top : 0,
          }}
        >
          <View className="flex-1">
            <View className="flex-row justify-between w-full mb-2">
              <View className="w-14">
                <CloseModalButton onPress={onClose} />
              </View>

              <View className="w-14" />
            </View>

            <View className="flex-1 space-y-4">
              <MySearchInput
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder={t("inputs.search")}
                autoFocus
              />
              <FlatList
                data={filteredCountries}
                renderItem={({ item }) => (
                  <MyPressable
                    onPress={() => onSelectCountryCode(item.code)}
                    className={`${countryCode === item.code && "bg-gray-400"} py-1 rounded px-2 flex-row justify-between items-center w-full`}
                  >
                    <MyText
                      className={`${countryCode === item.code && "font-semibold"}`}
                    >
                      {`${item.flag} ${item.name} `}
                      <MyText className="text-gray-300">{item.prefix}</MyText>
                    </MyText>

                    {countryCode === item.code && (
                      <Check color={background.light} size={18} weight="bold" />
                    )}
                  </MyPressable>
                )}
                keyExtractor={(item) => item.code}
              />
            </View>
          </View>
        </SafeAreaView>
      </MyScreen>
    </MyModal>
  );
};

export default CountryCodeModal;
