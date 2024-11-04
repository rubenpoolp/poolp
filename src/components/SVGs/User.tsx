import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

const User = (props: SvgProps) => (
  <Svg width={30} height={30} fill="none" viewBox="0 0 30 30" {...props}>
    <Path
      fill="#fff"
      fillRule="evenodd"
      d="M15 7.5a5 5 0 1 0 0 10 5 5 0 0 0 0-10Z"
      clipRule="evenodd"
    />
    <Path
      fill="#fff"
      fillRule="evenodd"
      d="M15 2.5C8.096 2.5 2.5 8.096 2.5 15S8.096 27.5 15 27.5 27.5 21.904 27.5 15 21.904 2.5 15 2.5ZM5 15C5 9.477 9.477 5 15 5s10 4.477 10 10a9.962 9.962 0 0 1-2.5 6.614A11.212 11.212 0 0 0 15 18.75c-2.881 0-5.51 1.084-7.5 2.865A9.962 9.962 0 0 1 5 15Z"
      clipRule="evenodd"
    />
  </Svg>
);

export default User;
