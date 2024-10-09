import LoaderScreen from "@pages/LoaderScreen";
import AskPermissionNotifications from "@pages/onboarding/AskPermissionNotifications";
import Birthday from "@pages/onboarding/Birthday";
import Gender from "@pages/onboarding/Gender";
import Introduction from "@pages/onboarding/Introduction";
import Name from "@pages/onboarding/Name";
import Phone from "@pages/onboarding/Phone";
import VerificationCode from "@pages/onboarding/VerificationCode";
import WaitingRoom from "@pages/onboarding/WaitingRoom";

export const onboardingRoutes: {
  name: string;
  component: ((object: any) => React.JSX.Element) | React.FC<object>;
}[] = [
  // { name: "Share", component: Share },
  { name: "Loader", component: LoaderScreen },
  { name: "Introduction", component: Introduction },
  { name: "Name", component: Name },
  { name: "Birthday", component: Birthday },
  { name: "Gender", component: Gender },
  { name: "Phone", component: Phone },
  { name: "VerificationCode", component: VerificationCode },
  { name: "AskPermissionNotifications", component: AskPermissionNotifications },
  { name: "WaitingRoom", component: WaitingRoom },
];
