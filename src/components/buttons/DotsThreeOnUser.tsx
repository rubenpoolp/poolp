import ReportModal from "@components/modals/ReportModal";
import MyPressable from "@components/natives/MyPressable";
import useActionSheetOnUser from "@hooks/useActionSheetOnUser";
import { DotsThree } from "phosphor-react-native";

const DotsThreeOnUser = ({ userId }: { userId: string }) => {
  const { onPress, isReportModalVisible, setIsReportModalVisible } =
    useActionSheetOnUser();

  return (
    <>
      <MyPressable onPress={() => onPress(userId)}>
        <DotsThree />
      </MyPressable>
      <ReportModal
        isVisible={isReportModalVisible}
        onClose={() => {
          setIsReportModalVisible(false);
        }}
        toUserId={userId}
      />
    </>
  );
};

export default DotsThreeOnUser;
