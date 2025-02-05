import useGetProfilePics from "@api/profilePics/getProfilePics.hook";
import { useAuth } from "@context/Auth";
import { useNavigation } from "@react-navigation/native";
import { logInRevenueCat } from "@utils/purchase";
import resetTo from "@utils/resetTo";
import { useEffect } from "react";

const useManageRoute = () => {
  const navigation = useNavigation();
  const { user, isLoading } = useAuth();
  const { data: profilePics, isLoading: isLoadingProfilePics } =
    useGetProfilePics();

  useEffect(() => {
    const manageRoute = async () => {
      if (isLoading || isLoadingProfilePics) return;

      if (!user) {
        resetTo(navigation, "Introduction");
        return;
      }

      if (!profilePics || profilePics?.length <= 0) {
        resetTo(navigation, "OnboardingProfilePicture", {
          canGoBack: false,
          nextScreen: "HomeStack",
        });
        return;
      }

      await logInRevenueCat(user.id, user.phone);
      resetTo(navigation, "HomeStack");
    };

    manageRoute();
  }, [navigation, user, isLoading, isLoadingProfilePics, profilePics]);
};

export default useManageRoute;
