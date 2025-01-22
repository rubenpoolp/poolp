import useGetMyDailyCircle from "@api/circles/getMyDailyCircle.hook";
import LogoWithButtonHeader from "@components/headers/LogoWithButtonHeader";
import MyScreen from "@components/MyScreen";
import NewCircleAvailable from "@components/NewCircleAvailable";
import NoCircle from "@components/NoCircle";
import ReviewPastCircle from "@components/ReviewPastCircle";
import TodayCircle from "@components/TodayCircle";
import { useAuth } from "@context/Auth";
import useNotifications from "@hooks/useNotifications";
import useReload from "@hooks/useReload";
import useTodayCircle from "@hooks/useTodayCircle";
import useTracking from "@hooks/useTracking";
import { useNavigation } from "@react-navigation/native";
import {
  getDateLastCircleReviewed,
  getDateLastTimeWentOnCircle,
  setDateLastCircleReviewed,
  setDateLastTimeWentOnCircle,
} from "@utils/circles";
import resetTo from "@utils/resetTo";
import { shareToInviteFriends } from "@utils/share";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const useRedirectIfNotLoggedIn = () => {
  const { user } = useAuth();
  const navigation = useNavigation();

  if (!user) resetTo(navigation, "Loader");
};

const Home = () => {
  const { t } = useTranslation();
  const [state, setState] = useState<
    "newCircle" | "openCircle" | "reviewPastCircle" | "noCircle"
  >("newCircle");
  const { initializeNotifications } = useNotifications();
  const { data: circle } = useGetMyDailyCircle();
  const { stories } = useTodayCircle();
  const navigation = useNavigation();
  useReload();
  useRedirectIfNotLoggedIn();
  useTracking();
  const isOnlyMeInCircle = circle?.user_ids?.length === 1;

  useEffect(() => {
    initializeNotifications();
  }, []);

  useEffect(() => {
    const checkDates = async () => {
      if (!circle || isOnlyMeInCircle) {
        setState("noCircle");
        return;
      }

      let lastCircleReviewed = await getDateLastCircleReviewed();
      let lastTimeWentOnCircle = await getDateLastTimeWentOnCircle();
      const circleCreatedAt = Number(format(circle.created_at, "t"));
      
      if (lastCircleReviewed === null) {
        setDateLastCircleReviewed();
        lastCircleReviewed = format(new Date(), "t");
      }
 
      if (lastTimeWentOnCircle === null) {
        if (circle) {
          setDateLastTimeWentOnCircle(circleCreatedAt - 10);
          lastTimeWentOnCircle = format(new Date(circleCreatedAt - 10), "t");
        } else {
          setDateLastTimeWentOnCircle();
          lastTimeWentOnCircle = format(new Date(), "t");
        }
      }
      
      if (Number(lastCircleReviewed) < circleCreatedAt) {
        setState("reviewPastCircle");
        return;
      } else if (Number(lastTimeWentOnCircle) < circleCreatedAt) {
        setState("newCircle");
        return;
      } else if (Number(lastTimeWentOnCircle) >= circleCreatedAt) {
        setState("openCircle");
        return;
      }
    };

    checkDates();
  }, [circle, stories]);

  const closeReviewPastCircle = () => {
    setDateLastCircleReviewed();
    setState("newCircle");
  };

  const openCircle = async () => {
    navigation.navigate("Camera");
  };

  return (
    <MyScreen padding className="space-y-4">
      <LogoWithButtonHeader
        onPress={shareToInviteFriends}
        txt={t("actions.invitePeers")}
        pastCircleButton
      />

      {state === "openCircle" && <TodayCircle />}

      {state === "reviewPastCircle" && (
        <ReviewPastCircle
          onClose={() => {
            closeReviewPastCircle();
          }}
        />
      )}

      {state === "newCircle" && <NewCircleAvailable onPress={openCircle} />}
      {state === "noCircle" && <NoCircle />}
    </MyScreen>
  );
};

export default Home;
