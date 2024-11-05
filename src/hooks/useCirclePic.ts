import useAddCirclePic from "@api/circles/addCirclePic.hook";
import useGetMyDailyCircle from "@api/circles/getMyDailyCircle.hook";
import { CIRCLE_PICS_BUCKET } from "@supabase_types";
import upload from "@utils/upload";

const useCirclePic = () => {
  const { data: circle } = useGetMyDailyCircle();
  const addCirclePic = useAddCirclePic();

  if (!circle) throw new Error("Circle not found");

  const uploadProfilePic = (uri: string) => {
    const url = `${circle.id}-${Date.now()}`;
    upload(url, uri, CIRCLE_PICS_BUCKET);
    addCirclePic.mutateAsync({ circleId: circle.id, url });
  };

  return { uploadProfilePic };
};

export default useCirclePic;
