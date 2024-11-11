import { useMutation } from "@tanstack/react-query";
import { myCaptureException } from "@utils/sentry";
import { ringUser } from "./ringUser.query";

const useRingUser = () => {
  return useMutation({
    mutationKey: ["ringUser"],
    mutationFn: async (userData: { userIds: string[] }) => {
      const { userIds } = userData;
      if (!userIds.length) {
        throw new Error("No users selected");
      }

      return ringUser(userIds);
    },
    onError: (error: Error) => {
      myCaptureException(error);
      throw new Error("Error sending notification", { cause: error });
    },
    onSuccess: () => {
      // TODO: Add success message to user
    },
  });
};

export default useRingUser; 