import { useTranslation } from "react-i18next";
import MyText from "@components/natives/MyText";
import MyModal from "./MyModal";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { FlatList, Platform, ScrollView, View } from "react-native";
import MyScreen from "@components/MyScreen";
import CloseModalButton from "@components/buttons/CloseModalButton";
import { Bump } from "@components/animations/Bump";
import MyButton from "@components/natives/MyButton";
import { GraduationCap } from "phosphor-react-native";
import MySearchInput from "@components/inputs/MySearchInput";
import SchoolItem from "@components/SchoolListItem";

export const Schools = [
  {
    name: "Oxford University",
    city: "Oxford",
    country: "UK",
    id: "1",
  },
  {
    name: "University of Cambridge",
    city: "Cambridge",
    country: "UK",
    id: "2",
  },
  {
    name: "Sorbonne University",
    city: "Paris",
    country: "France",
    id: "3",
  },
  {
    name: "University of Tokyo",
    city: "Tokyo",
    country: "Japan",
    id: "4",
  },
  {
    name: "National University of Singapore",
    city: "Singapore",
    country: "Singapore",
    id: "5",
  },
  {
    name: "ETH Zurich",
    city: "Zurich",
    country: "Switzerland",
    id: "6",
  },
  {
    name: "University of Melbourne",
    city: "Melbourne",
    country: "Australia",
    id: "7",
  },
  {
    name: "McGill University",
    city: "Montreal",
    country: "Canada",
    id: "8",
  },
  {
    name: "University of Cape Town",
    city: "Cape Town",
    country: "South Africa",
    id: "9",
  },
  {
    name: "University of São Paulo",
    city: "São Paulo",
    country: "Brazil",
    id: "10",
  },
  {
    name: "Peking University",
    city: "Beijing",
    country: "China",
    id: "11",
  },
  {
    name: "University of Sydney",
    city: "Sydney",
    country: "Australia",
    id: "12",
  },
  {
    name: "University of Munich",
    city: "Munich",
    country: "Germany",
    id: "13",
  },
  {
    name: "Indian Institute of Science",
    city: "Bangalore",
    country: "India",
    id: "14",
  },
];

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
              <FlatList
                data={Schools}
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
              {/* <ScrollView
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

                  {/* <EmptyList />
                </View>
              </ScrollView> */}
            </View>
          </View>
        </SafeAreaView>
      </MyScreen>
    </MyModal>
  );
};

export default SchoolListModal;
