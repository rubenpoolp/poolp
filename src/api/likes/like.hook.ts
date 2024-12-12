import { useMutation } from "@tanstack/react-query";
import { myCaptureException } from "@utils/sentry";
import { like } from "./like.query";

const useLike = () => {
  return useMutation({
    mutationKey: ["likes"],
    mutationFn: ({circleId, userIdToLike, userIdWhoLiked}: {circleId: string, userIdToLike: string, userIdWhoLiked: string}) => {
      return like(circleId, userIdToLike, userIdWhoLiked);
    },
    onError: (error: Error) => {
      myCaptureException(error);
      throw new Error("Error liking user", { cause: error });
    },
    onSuccess: () => {},
  });
};

export default useLike;