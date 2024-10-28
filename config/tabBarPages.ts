import Home from "@pages/home/Home";
import Profile from "@pages/profile/Profile";
import CameraPage from "@pages/takePicture/Camera";
import { Camera, House, UserCircle } from "phosphor-react-native";

export const TabBarPages = [
  { name: "Home", component: Home, Icon: House },
  { name: "Camera", component: CameraPage, Icon: Camera },
  { name: "Profile", component: Profile, Icon: UserCircle },
];

export const initialTab = "Home";
