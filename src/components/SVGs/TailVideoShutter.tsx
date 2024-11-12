import * as React from "react";
import Svg, {
  Defs,
  G,
  LinearGradient,
  Mask,
  Path,
  Stop,
  SvgProps,
} from "react-native-svg";

const TailVideoShutter = (props: SvgProps) => (
  <Svg width={80} height={80} viewBox="0 0 80 80" fill="none" {...props}>
    <G opacity={0.5}>
      <Mask id="b" fill="#fff">
        <Path d="M80 40c0 22.091-17.909 40-40 40S0 62.091 0 40 17.909 0 40 0s40 17.909 40 40ZM7.944 40c0 17.704 14.352 32.056 32.056 32.056 17.704 0 32.056-14.352 32.056-32.056C72.056 22.296 57.704 7.944 40 7.944 22.296 7.944 7.944 22.296 7.944 40Z" />
      </Mask>
      <Path
        stroke="url(#a)"
        strokeWidth={12}
        d="M80 40c0 22.091-17.909 40-40 40S0 62.091 0 40 17.909 0 40 0s40 17.909 40 40ZM7.944 40c0 17.704 14.352 32.056 32.056 32.056 17.704 0 32.056-14.352 32.056-32.056C72.056 22.296 57.704 7.944 40 7.944 22.296 7.944 7.944 22.296 7.944 40Z"
        mask="url(#b)"
      />
    </G>
    <Defs>
      <LinearGradient
        id="a"
        x1={9.333}
        x2={73.333}
        y1={65.333}
        y2={18}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#7826FD" />
        <Stop offset={1} stopColor="#A736FF" />
      </LinearGradient>
    </Defs>
  </Svg>
);
export default TailVideoShutter;
