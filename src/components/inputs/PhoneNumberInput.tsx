import CountryCodeModal from "@src/components/modals/CountryCodeModal";
import {
  AsYouType,
  CountryCode,
  getCountryCallingCode,
  getExampleNumber,
} from "libphonenumber-js";
import examples from "libphonenumber-js/mobile/examples";
import {
  ComponentProps,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { View } from "react-native";
import MyPressable from "@src/components/natives/MyPressable";
import MyTextInput from "./MyTextInput";
import { getFlagEmoji } from "@src/utils/i18n";
import MyText from "@src/components/natives/MyText";

interface PhoneNumberInputProps extends ComponentProps<typeof MyTextInput> {
  value: string;
  countryCode: CountryCode;
  setValue: Dispatch<SetStateAction<string>>;
  setCountryCode: Dispatch<SetStateAction<CountryCode>>;
  resetError: () => void;
}

const PhoneNumberInput = ({
  value,
  countryCode,
  setValue,
  setCountryCode,
  resetError,
  ...props
}: PhoneNumberInputProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [keyPress, setKeyPress] = useState("");
  const exampleNumber = getExampleNumber(
    countryCode,
    examples,
  )?.formatNational();
  const asYouType = new AsYouType(countryCode);

  useEffect(() => {
    if (value !== "") setValue(asYouType.input(value));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChangeText = (phone: string) => {
    resetError();
    let formattedNumber = phone;
    if (keyPress !== "Backspace") {
      asYouType.reset();
      formattedNumber = asYouType.input(phone);
    }
    setValue(formattedNumber);
  };

  return (
    <View className="flex-row space-x-5 w-full items-center">
      <MyPressable onPress={() => setIsModalVisible(true)}>
        <View className="py-2 px-4 border rounded-full border-gray-500">
          <MyTextInput
            onPress={() => setIsModalVisible(true)}
            value={`+${getCountryCallingCode(countryCode)}`}
            textAlign="center"
            editable={false}
            className="text-gray-400"
            {...props}
          />
        </View>
      </MyPressable>

      <MyTextInput
        className="flex-1 text-light font-semibold text-3xl"
        value={value}
        placeholder={exampleNumber}
        inputMode="numeric"
        onKeyPress={(e) => setKeyPress(e.nativeEvent.key)}
        onChangeText={onChangeText}
        maxLength={exampleNumber?.length}
        autoFocus
        {...props}
      />
      <CountryCodeModal
        isVisible={isModalVisible}
        countryCode={countryCode}
        setCountryCode={setCountryCode}
        resetValue={() => setValue("")}
        onClose={() => setIsModalVisible(false)}
      />
    </View>
  );
};

export default PhoneNumberInput;
