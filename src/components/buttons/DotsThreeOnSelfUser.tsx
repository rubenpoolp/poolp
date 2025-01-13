import MyPressable from "@components/natives/MyPressable";
import useActionSheetOnSelfUser from "@hooks/useActionSheetOnSelfUser";
import { DotsThree } from "phosphor-react-native";

const DotsThreeOnSelfUser = ({
  circleId,
  circlePicId,
  onDeleteAction,
}: {
  circleId: string;
  circlePicId: string;
  onDeleteAction: () => void;
}) => {
  const { onPress } = useActionSheetOnSelfUser();

  return (
    <>
      <MyPressable onPress={() => {
          onPress(circleId, circlePicId, onDeleteAction);
        }
      }
      >
        <DotsThree />
      </MyPressable>
    </>
  );
};

export default DotsThreeOnSelfUser;
