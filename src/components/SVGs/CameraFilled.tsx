import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

const CameraFilled = (props: SvgProps) => (
  <Svg width={30} height={30} viewBox="0 0 30 30" fill="none" {...props}>
    <Path
      fill="#fff"
      fillRule="evenodd"
      d="M7.909 6.07a5.222 5.222 0 0 1 4.954-3.57h4.274a5.222 5.222 0 0 1 4.954 3.57c.08.24.276.42.52.482l1.006.251a5.126 5.126 0 0 1 3.883 4.973v9.474a6.25 6.25 0 0 1-6.25 6.25H8.75a6.25 6.25 0 0 1-6.25-6.25v-9.474c0-2.352 1.6-4.402 3.883-4.973l1.006-.251a.736.736 0 0 0 .52-.481ZM12.863 5c-1.172 0-2.212.75-2.582 1.861a3.236 3.236 0 0 1-2.285 2.116l-1.007.252A2.626 2.626 0 0 0 5 11.776v9.474A3.75 3.75 0 0 0 8.75 25h12.5A3.75 3.75 0 0 0 25 21.25v-9.474c0-1.205-.82-2.255-1.989-2.547l-1.007-.252a3.236 3.236 0 0 1-2.285-2.116A2.722 2.722 0 0 0 17.137 5h-4.274Z"
      clipRule="evenodd"
    />
    <Path
      fill="#fff"
      fillRule="evenodd"
      d="M15 13.75a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Zm-5 2.5a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z"
      clipRule="evenodd"
    />
  </Svg>
);

export default CameraFilled;
