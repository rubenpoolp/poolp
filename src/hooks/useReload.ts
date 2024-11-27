import useGetMyDailyCircle from "@api/circles/getMyDailyCircle.hook";
import { useAuth } from "@context/Auth";
import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { useEffect } from "react";
import useAppState from "./useAppState";

const useReload = () => {
  const queryClient = useQueryClient();
  const appState = useAppState();
  const auth = useAuth();
  const { data: circle } = useGetMyDailyCircle();
  
  useEffect(() => {
    if (appState === "active" && auth.user && circle) {
      queryClient.invalidateQueries({ queryKey: ["circle", auth.user.id, format(new Date(), "yyyy-MM-dd")] });
      queryClient.invalidateQueries({ queryKey: ["getCirclePics", circle.id] });
    }
  }, [appState]);
};

export default useReload;

