import { useMutation } from "@tanstack/react-query";
import { myCaptureException } from "@utils/sentry";
import { like } from "./like.query";

const useLike = () => {
  return useMutation({
    mutationKey: ["like"],
    mutationFn: ({circleId, userId}: {circleId: string, userId: string}) => {
      return like(circleId, userId);
    },
    onError: (error: Error) => {
      myCaptureException(error);
      throw new Error("Error liking user", { cause: error });
    },
    onSuccess: () => {},
  });
};

export default useLike;