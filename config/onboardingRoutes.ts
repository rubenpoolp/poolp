import LoaderScreen from "@pages/LoaderScreen";
import BottomTabNavigator from "@pages/navigation/BottomTabNavigator";
import HomeStackNavigator from "@pages/navigation/HomeStackNavigator";
import AskPermissionNotifications from "@pages/onboarding/AskPermissionNotifications";
import Birthday from "@pages/onboarding/Birthday";
import Gender from "@pages/onboarding/Gender";
import Introduction from "@pages/onboarding/Introduction";
import Name from "@pages/onboarding/Name";
import Phone from "@pages/onboarding/Phone";
import School from "@pages/onboarding/School";
import Share from "@pages/onboarding/Share";
import VerificationCode from "@pages/onboarding/VerificationCode";
import WaitingRoom from "@pages/onboarding/WaitingRoom";

export const onboardingRoutes: {
  name: string;
  component: ((object: any) => React.JSX.Element) | React.FC<object>;
}[] = [
  { name: "Loader", component: LoaderScreen },
  { name: "Introduction", component: Introduction },
  { name: "HomeStack", component: BottomTabNavigator },
  { name: "Phone", component: Phone },
  { name: "VerificationCode", component: VerificationCode },
  { name: "Name", component: Name },
  { name: "Birthday", component: Birthday },
  { name: "Gender", component: Gender },
  { name: "School", component: School },
  { name: "AskPermissionNotifications", component: AskPermissionNotifications },
  { name: "Share", component: Share },
  { name: "WaitingRoom", component: WaitingRoom },
];
