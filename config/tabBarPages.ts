import Camera from "@components/SVGs/Camera";
import CameraFilled from "@components/SVGs/CameraFilled";
import HomeSVG from "@components/SVGs/Home";
import HomeFilled from "@components/SVGs/HomeFilled";
import User from "@components/SVGs/User";
import UserFilled from "@components/SVGs/UserFilled";
import Home from "@pages/home/Home";
import Profile from "@pages/profile/Profile";
import CameraPage from "@pages/takePicture/Camera";

export const TabBarPages = [
  { name: "Home", component: Home, Icon: HomeSVG, IconFilled: HomeFilled },
  {
    name: "Camera",
    component: CameraPage,
    Icon: Camera,
    IconFilled: CameraFilled,
  },
  { name: "Profile", component: Profile, Icon: User, IconFilled: UserFilled },
];

export const initialTab = "Home";
