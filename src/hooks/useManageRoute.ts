import { useAuth } from "@context/Auth";
import { useNavigation } from "@react-navigation/native";
import resetTo from "@utils/resetTo";
import { useEffect } from "react";

const useManageRoute = () => {
  const navigation = useNavigation();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    const manageRoute = async () => {
      if (isLoading) return;

      if (!user) {
        resetTo(navigation, "Introduction");
      } else {
        // await logInRevenueCat(user.id, user.email);
        resetTo(navigation, "HomeStack");
      }
    };

    manageRoute();
  }, [navigation, user, isLoading]);
};

export default useManageRoute;
