import Circles from "@pages/circles/Circles";
import Home from "@pages/home/Home";
import Profile from "@pages/profile/Profile";
import CameraPage from "@pages/takePicture/Camera";
import { Camera, IntersectThree, UserFocus } from "phosphor-react-native";

export const TabBarPages = [
  { name: "Circles", component: Circles, Icon: UserFocus },
  { name: "Home", component: Home, Icon: IntersectThree },
  { name: "Camera", component: CameraPage, Icon: Camera },
  { name: "Profile", component: Profile, Icon: null },
  ];

export const initialTab = "Home";
