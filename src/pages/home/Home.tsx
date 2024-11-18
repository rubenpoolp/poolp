import useGetMyDailyCircle from "@api/circles/getMyDailyCircle.hook";
import LogoWithButtonHeader from "@components/headers/LogoWithButtonHeader";
import MyScreen from "@components/MyScreen";
import NewCircleAvailable from "@components/NewCircleAvailable";
import ReviewPastCircle from "@components/ReviewPastCircle";
import TodayCircle from "@components/TodayCircle";
import { useAuth } from "@context/Auth";
import useNotifications from "@hooks/useNotifications";
import { useNavigation } from "@react-navigation/native";
import {
  getDateLastCircleReviewed,
  getDateLastTimeWentOnCircle,
  setDateLastCircleReviewed,
  setDateLastTimeWentOnCircle,
} from "@utils/circles";
import resetTo from "@utils/resetTo";
import { shareToInviteFriends } from "@utils/share";
import { getTime, parseISO } from "date-fns";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const useRedirectIfNotLoggedIn = () => {
  const { user } = useAuth();
  const navigation = useNavigation();

  if (!user) resetTo(navigation, "Loader");
};

const Home = () => {
  useRedirectIfNotLoggedIn();
  const { t } = useTranslation();
  const [state, setState] = useState<
    "newCircle" | "openCircle" | "reviewPastCircle"
  >("reviewPastCircle");
  const { initializeNotifications } = useNotifications();
  const { data: circle } = useGetMyDailyCircle();

  useEffect(() => {
    initializeNotifications();
  }, []);

  useEffect(() => {
    const checkDates = async () => {
      const lastCircleReviewed = await getDateLastCircleReviewed();
      const lastTimeWentOnCircle = await getDateLastTimeWentOnCircle();

      console.log("lastCircleReviewed", lastCircleReviewed);
      console.log("lastTimeWentOnCircle", lastTimeWentOnCircle);

      if (!circle?.created_at) {
        setState("newCircle");
        return;
      }

      const circleCreatedAt = getTime(parseISO(circle.created_at));
      console.log("circleCreatedAt", circleCreatedAt);

      if (lastCircleReviewed) {
        if (Number(lastCircleReviewed) > circleCreatedAt) {
          setState("reviewPastCircle");
          return;
        }

        if (lastTimeWentOnCircle) {
          if (Number(lastTimeWentOnCircle) < circleCreatedAt) {
            setState("openCircle");
          } else {
            setState("newCircle");
          }
        }
      }
    };

    checkDates();
  }, []);

  console.log("state :", state);

  const closeReviewPastCircle = () => {
    setDateLastCircleReviewed();
    setState("newCircle");
  };

  const openCircle = () => {
    setState("openCircle");
    setDateLastTimeWentOnCircle();
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
    </MyScreen>
  );
};

export default Home;
