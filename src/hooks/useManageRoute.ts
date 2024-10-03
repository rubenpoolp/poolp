import { useNavigation } from "@react-navigation/native";
import { useAuth } from "@src/context/Auth";
import resetTo from "@src/utils/resetTo";
import { useEffect } from "react";

const useManageRoute = () => {
  const navigation = useNavigation();
  const { user, loading } = useAuth();

  useEffect(() => {
    const manageRoute = async () => {
      if (loading) return;

      if (!user) {
        resetTo(navigation, "Introduction");
      } else {
        // await logInRevenueCat(user.id, user.email);
        resetTo(navigation, "HomeStack");
      }
    };

    manageRoute();
  }, [navigation, user, loading]);
};

export default useManageRoute;
