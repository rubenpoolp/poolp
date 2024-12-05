import useAddCirclePic from "@api/circles/addCirclePic.hook";
import useGetMyDailyCircle from "@api/circles/getMyDailyCircle.hook";
import useSendNotifOnReply from "@api/notifications/sendNotifOnReply.hook";
import { useIsLoading } from "@context/IsLoading";
import { CIRCLE_PICS_BUCKET } from "@supabase_types";
import { uploadVideo } from "@utils/upload";

const useCircleVideo = () => {
  const { data: circle } = useGetMyDailyCircle();
  const addCirclePic = useAddCirclePic();
  const sendNotifOnReply = useSendNotifOnReply();
  const { setIsLoading } = useIsLoading();

  const uploadVid = async (uri: string) => {
    if (!circle) throw new Error("The user has no circle");

    setIsLoading(true);
    const type = uri.split(".").pop();
    const url = `${circle.id}/${Date.now()}.${type}`;

  //   MovToMp4.convertMovToMp4(uri, url + ".mp4")
  //     .then(function (results: any) {
  //       //here you can upload the video...
  //       console.log(results);
  // });

    const result = await uploadVideo(url, uri, CIRCLE_PICS_BUCKET);
    if (result.error) {
      console.error("Error uploading video", result.error);
      setIsLoading(false);
      return;
    }

    await addCirclePic.mutateAsync({ circleId: circle.id, url });
    await sendNotifOnReply.mutateAsync(circle.user_ids!);

    setIsLoading(false);
  };

  return { uploadVid };
};

export default useCircleVideo;
