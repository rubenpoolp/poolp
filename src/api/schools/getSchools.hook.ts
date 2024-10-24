import { useQuery } from "@tanstack/react-query";
import getSchools from "./getSchools.query";

const useGetSchools = () => {
  return useQuery({
    queryKey: ["schools"],
    queryFn: getSchools,
    initialData: undefined,
  });
};

export default useGetSchools;