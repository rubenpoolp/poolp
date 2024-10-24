import { Bump } from "@components/animations/Bump";
import MyButton from "@components/natives/MyButton";
import MyText from "@components/natives/MyText";
import { School } from "@supabase_types";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

const SchoolItem = ({
  school,
  onSelect,
}: {
  school: School;
  onSelect: (_school: School) => void;
}) => {
  const { t } = useTranslation();

  return (
    <View className="flex-row items-center border-b border-gray-400 p-4 space-x-4 justify-between">
      <View className="flex-row items-center space-x-4 flex-1">
        <View className="border border-light rounded-full pt-1.5 pb-3 px-3 ">
          <MyText className="font-semibold text-2xl">🏫</MyText>
        </View>

        <View className="flex-1 mr-4">
          <MyText className="font-semibold" numberOfLines={1}>
            {school.name}
          </MyText>
          <MyText className="text-gray-500 font-light">
            {school.address?.city}, {school.address?.country}
          </MyText>
        </View>
      </View>

      <Bump scaleValue={0.95}>
        <MyButton
          txt={t("actions.select")}
          onPress={() => {
            onSelect(school);
          }}
          className=""
          size="small"
        />
      </Bump>
    </View>
  );
};

export default SchoolItem;
