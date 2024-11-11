import * as React from "react";
import Svg, {
  Defs,
  LinearGradient,
  Path,
  Stop,
  SvgProps,
} from "react-native-svg";

const Check = (props: SvgProps) => (
  <Svg width={22} height={16} fill="none" {...props}>
    <Path
      stroke="url(#a)"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={4}
      d="M20 2 7.625 14 2 8.545"
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={11}
        x2={11}
        y1={2}
        y2={14}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#FEEFAF" />
        <Stop offset={0.51} stopColor="#D38F2F" />
      </LinearGradient>
    </Defs>
  </Svg>
);
export default Check;
