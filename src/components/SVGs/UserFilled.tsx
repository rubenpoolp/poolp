import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

const UserFilled = (props: SvgProps) => (
  <Svg width={30} height={30} viewBox="0 0 30 30" fill="none" {...props}>
    <Path
      fill="#fff"
      fillRule="evenodd"
      d="M2.5 15C2.5 8.096 8.096 2.5 15 2.5S27.5 8.096 27.5 15 21.904 27.5 15 27.5 2.5 21.904 2.5 15ZM15 5C9.477 5 5 9.477 5 15s4.477 10 10 10 10-4.477 10-10S20.523 5 15 5Z"
      clipRule="evenodd"
    />
    <Path
      fill="#fff"
      fillRule="evenodd"
      d="M15 10a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Zm-5 2.5a5 5 0 1 1 10 0 5 5 0 0 1-10 0ZM15 21.25a8.726 8.726 0 0 0-6.563 2.963l-1.874-1.655A11.226 11.226 0 0 1 15 18.75c3.36 0 6.378 1.475 8.437 3.808l-1.874 1.655A8.726 8.726 0 0 0 15 21.25Z"
      clipRule="evenodd"
    />
  </Svg>
);

export default UserFilled;
