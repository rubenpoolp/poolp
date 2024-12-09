import CountryCodeModal from "@components/modals/CountryCodeModal";
import MyPressable from "@components/natives/MyPressable";
import { gray } from "@config/colors";
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
  forwardRef,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { TextInput, View } from "react-native";
import MyTextInput from "./MyTextInput";

interface PhoneNumberInputProps extends ComponentProps<typeof MyTextInput> {
  value: string;
  countryCode: CountryCode;
  setValue: Dispatch<SetStateAction<string>>;
  setCountryCode: Dispatch<SetStateAction<CountryCode>>;
  resetError: () => void;
}

const PhoneNumberInput = forwardRef<TextInput, PhoneNumberInputProps>(
  (
    { value, countryCode, setValue, setCountryCode, resetError, ...props },
    ref,
  ) => {
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
              className="text-gray-400 text-base"
              {...props}
            />
          </View>
        </MyPressable>

        <MyTextInput
          ref={ref}
          className="flex-1 text-light font-semibold text-3xl"
          value={value}
          placeholder={exampleNumber}
          inputMode="numeric"
          onKeyPress={(e) => setKeyPress(e.nativeEvent.key)}
          onChangeText={onChangeText}
          maxLength={exampleNumber?.length}
          placeholderTextColor={gray[500]}
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
  },
);

PhoneNumberInput.displayName = "PhoneNumberInput";

export default PhoneNumberInput;
