import LoaderScreen from "@pages/LoaderScreen";
import HomeStackNavigator from "@pages/navigation/HomeStackNavigator";
import Birthday from "@pages/onboarding/Birthday";
import Gender from "@pages/onboarding/Gender";
import Introduction from "@pages/onboarding/Introduction";
import Name from "@pages/onboarding/Name";
import Phone from "@pages/onboarding/Phone";
import Share from "@pages/onboarding/Share";
import VerificationCode from "@pages/onboarding/VerificationCode";

export const onboardingRoutes: {
  name: string;
  component: ((object: any) => React.JSX.Element) | React.FC<object>;
}[] = [
  { name: "Share", component: Share },
  { name: "Loader", component: LoaderScreen },
  { name: "Introduction", component: Introduction },
  { name: "Name", component: Name },
  { name: "Birthday", component: Birthday },
  { name: "Gender", component: Gender },
  { name: "Phone", component: Phone },
  { name: "VerificationCode", component: VerificationCode },
  { name: "HomeStack", component: HomeStackNavigator },
];
