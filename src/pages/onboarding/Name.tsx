import React, { useState } from "react";
import { View, TextInput } from "react-native";
import { useTranslation } from "react-i18next";
import MyScreen from "@src/components/MyScreen";
import MyText from "@src/components/natives/MyText";

const Name = ({ navigation }: { navigation: any }) => {
  const { t } = useTranslation();
  const [name, setName] = useState("");

  return (
    <MyScreen className="">
      <View className="flex w-full bg-red">
        <MyText className="text-2xl font-semibold mb-5">
          {t("name.title")}
        </MyText>

        <TextInput
          value={name}
          onChangeText={setName}
          className="w-full border border-gray-300 rounded-md p-2 mt-4"
        />
      </View>
    </MyScreen>
  );
};

export default Name;
