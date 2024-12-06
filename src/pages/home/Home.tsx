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
  useReload();
  useRedirectIfNotLoggedIn();

  useEffect(() => {
    initializeNotifications();
  }, [initializeNotifications]);

  useEffect(() => {
    const checkDates = async () => {
      if (!circle) {
        setState("noCircle");
        return;
      }

      let lastCircleReviewed = await getDateLastCircleReviewed();
      let lastTimeWentOnCircle = await getDateLastTimeWentOnCircle();

      if (lastTimeWentOnCircle === null) {
        setDateLastTimeWentOnCircle();
        lastTimeWentOnCircle = format(new Date(), "t");
      }

      if (lastCircleReviewed === null) {
        setDateLastCircleReviewed();
        lastCircleReviewed = format(new Date(), "t");
      }

      const circleCreatedAt = Number(format(circle.created_at, "t"));

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
  }, [circle]);

  const closeReviewPastCircle = () => {
    setDateLastCircleReviewed();
    setState("newCircle");
  };

  const openCircle = () => {
    setDateLastTimeWentOnCircle();
    setState("openCircle");
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
