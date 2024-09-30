import { TextInput } from "react-native";

interface MyTextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  onSubmitEditing: () => void;
}
const MyTextInput = ({
  value,
  onChangeText,
  placeholder,
  onSubmitEditing,
}: MyTextInputProps) => {
  return (
    <TextInput
      autoCapitalize="none"
      maxLength={4000}
      className="border-0 flex-1 mb-5"
      style={{
        textAlignVertical: "top",
      }}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      multiline
      onSubmitEditing={onSubmitEditing}
      autoCorrect={false}
      spellCheck={false}
    />
  );
};

export default MyTextInput;
