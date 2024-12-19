import { useQuery } from "@tanstack/react-query";
import { getRings } from "./getRings.query";

const useGetRings = (userId: string) => {
  return useQuery({
    queryKey: ["rings", userId],
    queryFn: () => getRings(userId),
    enabled: !!userId,
    initialData: undefined,
  });
}

export default useGetRings;