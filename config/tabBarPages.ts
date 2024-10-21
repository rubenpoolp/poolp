import Circles from "@pages/circles/Circles";
import Home from "@pages/home/Home";
import Profile from "@pages/profile/Profile";
import CameraPage from "@pages/takePicture/Camera";
import { Camera, CirclesFour, UserFocus } from "phosphor-react-native";

export const TabBarPages = [
  { name: "Home", component: Home, Icon: CirclesFour },
  { name: "Camera", component: CameraPage, Icon: Camera },
  { name: "Profile", component: Profile, Icon: null },
];

export const initialTab = "Home";
