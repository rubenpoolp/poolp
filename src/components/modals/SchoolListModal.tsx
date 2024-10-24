import { Bump } from "@components/animations/Bump";
import CloseModalButton from "@components/buttons/CloseModalButton";
import MySearchInput from "@components/inputs/MySearchInput";
import MyScreen from "@components/MyScreen";
import MyButton from "@components/natives/MyButton";
import MyText from "@components/natives/MyText";
import SchoolItem from "@components/SchoolListItem";
import { GraduationCap } from "phosphor-react-native";
import { useTranslation } from "react-i18next";
import { FlatList, Platform, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import MyModal from "./MyModal";
import useGetSchools from "@api/schools/getSchools.hook";

const EmptyList = () => {
  return (
    <View className="items-center justify-center space-y-8 mt-10 px-4">
      <View className="items-center space-y-2">
        <GraduationCap size={40} />
        <MyText className="font-semibold text-center">
          We apologize, but your school is not currently available.
        </MyText>
      </View>

      <View>
        <Bump scaleValue={0.95}>
          <MyButton txt="Add your school" onPress={() => {}} className="" />
        </Bump>
      </View>
    </View>
  );
};

interface SchoolListModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSelect: (_school: any) => void;
}

const SchoolListModal = ({
  isVisible,
  onClose,
  onSelect,
}: SchoolListModalProps) => {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();

  const { data } = useGetSchools();
  console.log(data);

  return (
    <MyModal
      isVisible={isVisible}
      className="flex-1"
      animationIn="slideInUp"
      animationOut="slideOutDown"
    >
      <MyScreen className="w-screen">
        <SafeAreaView
          style={{
            flex: 1,
            paddingTop: Platform.OS === "ios" ? insets.top : 0,
          }}
        >
          <View className="flex-1">
            <View className="flex-row justify-between mb-2 w-full px-2">
              <View className="w-14">
                <CloseModalButton onPress={onClose} />
              </View>
              <MyText className="text-2xl font-semibold mb-5">
                Find your school
              </MyText>
              <View className="w-14" />
            </View>

            <View className="space-y-2">
              <View className="w-full px-4">
                <MySearchInput
                  placeholder={t("onboarding.inputs.searchSchools")}
                />
              </View>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={data}
                renderItem={({ item }) => (
                  <SchoolItem key={item.id} school={item} onSelect={onSelect} />
                )}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={EmptyList}
                contentContainerStyle={{
                  paddingBottom: 140,
                  paddingHorizontal: 0,
                }}
              />
            </View>
          </View>
        </SafeAreaView>
      </MyScreen>
    </MyModal>
  );
};

export default SchoolListModal;
