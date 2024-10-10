import { useTranslation } from "react-i18next";
import MyText from "@components/natives/MyText";
import MyModal from "./MyModal";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Platform, ScrollView, View } from "react-native";
import MyScreen from "@components/MyScreen";
import CloseModalButton from "@components/buttons/CloseModalButton";
import { Bump } from "@components/animations/Bump";
import MyButton from "@components/natives/MyButton";
import { GraduationCap } from "phosphor-react-native";
import MySearchInput from "@components/inputs/MySearchInput";

const Schools = [
  {
    name: "Stanford University",
    city: "Stanford",
    country: "USA",
    id: "1",
  },
  {
    name: "Harvard University",
    city: "Cambridge",
    country: "USA",
    id: "2",
  },
  {
    name: "MIT",
    city: "Boston",
    country: "USA",
    id: "3",
  },
  {
    name: "University of California",
    city: "Berkeley",
    country: "USA",
    id: "4",
  },
  {
    name: "University of California",
    city: "Los Angeles",
    country: "USA",
    id: "5",
  },
  {
    name: "Harvard University",
    city: "Cambridge",
    country: "USA",
    id: "6",
  },
  {
    name: "MIT",
    city: "Boston",
    country: "USA",
    id: "7",
  },
  {
    name: "University of California",
    city: "Berkeley",
    country: "USA",
    id: "8",
  },
  {
    name: "University of California",
    city: "Los Angeles",
    country: "USA",
    id: "9",
  },
];

const SchoolItem = ({
  school,
  onSelect,
}: {
  school: (typeof Schools)[0];
  onSelect: (_school: any) => void;
}) => {
  return (
    <View className="flex-row items-center border-b border-gray-400 py-4 px-4 space-x-4 justify-between">
      <View className="flex-row items-center space-x-4">
        <View className="border border-light rounded-full pt-1.5 pb-3 px-3 ">
          <MyText className="font-semibold text-2xl">🏫</MyText>
        </View>

        <View>
          <MyText className="font-semibold">{school.name}</MyText>
          <MyText className="text-gray-500 font-light">
            {school.city}, {school.country}
          </MyText>
        </View>
      </View>

      <Bump scaleValue={0.95}>
        <MyButton
          txt="Select"
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

const EmptyList = () => {
  return (
    <View className="items-center justify-center space-y-8 mt-10">
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

  return (
    <MyModal isVisible={isVisible} className="flex-1">
      <MyScreen className="w-screen">
        <SafeAreaView
          style={{
            flex: 1,
            paddingTop: Platform.OS === "ios" ? insets.top : 0,
          }}
        >
          <View className="flex-1">
            <View className="flex-row justify-between mb-2 w-full px-4">
              <View className="w-14">
                <CloseModalButton onPress={onClose} />
              </View>
              <MyText className="text-2xl font-semibold mb-5 ">
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
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  paddingTop: 0,
                  paddingHorizontal: 0,
                }}
              >
                <View className="w-full">
                  {Schools.map((school) => (
                    <SchoolItem
                      key={school.id}
                      school={school}
                      onSelect={onSelect}
                    />
                  ))}

                  {/* <EmptyList /> */}
                </View>
              </ScrollView>
            </View>
          </View>
        </SafeAreaView>
      </MyScreen>
    </MyModal>
  );
};

export default SchoolListModal;
