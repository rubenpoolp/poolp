import { useAuth } from "@context/Auth";
import { useQuery } from "@tanstack/react-query";
import { getCirclePicsStorageUrl } from "@utils/getStorageUrl";
import getCirclePics from "./getCirclePics.query";

const useGetCirclePics = (circleId?: string) => {
  const auth = useAuth();
  const userId = auth.user?.id;

  return useQuery({
    queryKey: ["getCirclePics", circleId],
    queryFn: async () => {
      if (!userId) {
        throw new Error("User id is required to get circle pics");
      }
      if (!circleId) {
        throw new Error("Circle id is required to get circle pics");
      }

      const circlePics = await getCirclePics(circleId, userId);
      const newCirclePics = await Promise.all(
        circlePics.map(async (pic) => ({
          ...pic,
          url: await getCirclePicsStorageUrl(pic.url),
        })),
      );
      return newCirclePics;
    },
    initialData: [],
    enabled: !!circleId,
    refetchOnWindowFocus: true,
  });
};

export default useGetCirclePics;
