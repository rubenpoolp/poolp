import { TextInput, View } from "react-native";

interface PhoneInputProps extends React.ComponentProps<typeof TextInput> {}

const PhoneInput = (props: PhoneInputProps) => {
  return (
    <View
      className={`justify-center px-4 py-2 w-full bg-white shadow-lg rounded-2xl mb-4`}
      style={props.style}
    >
      <TextInput
        autoCapitalize="none"
        className="h-8"
        placeholder="06 06 06 06 06"
        {...props}
      />
    </View>
  );
};

export default PhoneInput;
