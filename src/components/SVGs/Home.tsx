import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

const Home = (props: SvgProps) => (
  <Svg width={30} height={30} viewBox="0 0 30 30" fill="none" {...props}>
    <Path
      fill="#fff"
      fillRule="evenodd"
      d="m25.599 9.473-6.733-5.567a6.018 6.018 0 0 0-7.732 0L4.4 9.473C3.188 10.476 2.5 11.996 2.5 13.583v10.01c0 2.084 1.608 3.907 3.75 3.907h2.5a3.75 3.75 0 0 0 3.75-3.75v-4.144c0-.85.63-1.408 1.25-1.408h2.5c.62 0 1.25.558 1.25 1.408v4.144a3.75 3.75 0 0 0 3.75 3.75h2.5c2.142 0 3.75-1.823 3.75-3.908v-10.01c0-1.586-.688-3.106-1.901-4.11Z"
      clipRule="evenodd"
    />
  </Svg>
);

export default Home;
