import MyPressable from "@components/natives/MyPressable";
import useActionSheetOnSelfUser from "@hooks/useActionSheetOnSelfUser";
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
    
  return (
    <>
      <MyPressable onPress={() => onPress(circleId, circlePicId)}>
        <DotsThree />
      </MyPressable>
    </>
  );
};

export default DotsThreeOnSelfUser;
