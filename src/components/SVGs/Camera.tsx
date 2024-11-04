import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

const Camera = (props: SvgProps) => (
  <Svg width={30} height={30} viewBox="0 0 30 30" fill="none" {...props}>
    <Path
      fill="#fff"
      fillRule="evenodd"
      d="M12.863 2.5a5.222 5.222 0 0 0-4.954 3.57.736.736 0 0 1-.52.482l-1.006.251A5.126 5.126 0 0 0 2.5 11.776v9.474a6.25 6.25 0 0 0 6.25 6.25h12.5a6.25 6.25 0 0 0 6.25-6.25v-9.474c0-2.352-1.6-4.402-3.883-4.973l-1.006-.251a.736.736 0 0 1-.52-.481A5.222 5.222 0 0 0 17.137 2.5h-4.274ZM15 13.75a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Zm-5 2.5a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z"
      clipRule="evenodd"
    />
  </Svg>
);

export default Camera;
