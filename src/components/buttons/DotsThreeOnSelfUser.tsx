import MyPressable from "@components/natives/MyPressable";
import useActionSheetOnSelfUser from "@hooks/useActionSheetOnSelfuser";
import { DotsThree } from "phosphor-react-native";

const DotsThreeOnSelfUser = ({
  
  circleId,
  circlePicId,
}: {
  
  circleId: string;
  circlePicId: string;
}) => {
  const { onPress } =
    useActionSheetOnSelfUser();

  console.log("dots three on self user", circleId, circlePicId);
  return (
    <>
      <MyPressable onPress={() => onPress(circleId, circlePicId)}>
        <DotsThree />
      </MyPressable>
    </>
  );
};

export default DotsThreeOnSelfUser;
