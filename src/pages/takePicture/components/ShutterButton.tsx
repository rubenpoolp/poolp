import shadow from "@config/shadow";
import { hapticImpact } from "@utils/haptics";
import React, { useEffect, useState } from "react";
import { Pressable } from "react-native";
import Animated, {
  Easing,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import Svg, { Circle, LinearGradient, Stop } from "react-native-svg";

const HOLD_TIME_FOR_VIDEO = 500;
const CIRCLE_RADIUS = 40;
const STROKE_WIDTH = 8;
const CIRCLE_DIAMETER = CIRCLE_RADIUS * 2;
const CIRCLE_LENGTH = 2 * Math.PI * CIRCLE_RADIUS;

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export const AnimatedPlayPauseButton = ({
  onPress,

  onTakeVideo,
  onEndTakeVideo,

  maxDuration,
}: {
  onPress: () => void;
  
  onTakeVideo: () => void;
  onEndTakeVideo: () => void;

  maxDuration: number;
}) => {
  const [timeHolded, setTimeHolded] = useState(0);
  const [isPressed, setIsPressed] = useState(false);
  const isHolding = useSharedValue(false);
  const progress = useSharedValue(0);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: CIRCLE_LENGTH * (1 - progress.value),
  }));

  const opacity = useAnimatedStyle(() => ({
    opacity: progress.value !== 0 ? 1 : 0,
  }));

  useEffect(() => {
    let holdTimer: NodeJS.Timeout;

    if (isPressed && timeHolded !== 0) {
      holdTimer = setTimeout(() => {
        isHolding.value = true;
        onTakeVideo();
        progress.value = withRepeat(
          withTiming(1, {
            duration: maxDuration,
            easing: Easing.linear,
          }),
          -1,
          false,
        );
        setTimeout(() => {
          hapticImpact("rigid");
        }, maxDuration - HOLD_TIME_FOR_VIDEO);
      }, HOLD_TIME_FOR_VIDEO);
    }

    return () => {
      if (holdTimer) {
        clearTimeout(holdTimer);
      }
    };
  }, [isPressed, timeHolded]);

  const stopHoldAnimation = () => {
    isHolding.value = false;
    progress.value = withTiming(0);
  };

  return (
    <Pressable
      className="items-center justify-center border-gray-200 rounded-full"
      style={{
        width: CIRCLE_DIAMETER,
        height: CIRCLE_DIAMETER,
        borderWidth: STROKE_WIDTH,
        ...shadow.purple,
      }}
      onPressIn={() => {
        setIsPressed(true);
        setTimeHolded(new Date().getTime());
      }}
      onTouchEnd={() => {
        setIsPressed(false);
        const currentTime = new Date().getTime();

        if (timeHolded < currentTime - HOLD_TIME_FOR_VIDEO) {
          onEndTakeVideo();
          stopHoldAnimation();
        } else {
          onPress();
        }
        setTimeHolded(0);
      }}
    >
      <Animated.View style={opacity} className={"bg-[#B595E9] rounded-full"}>
        <Svg
          width={CIRCLE_DIAMETER}
          height={CIRCLE_DIAMETER}
          viewBox={`0 0 ${CIRCLE_DIAMETER} ${CIRCLE_DIAMETER}`}
          style={{
            transform: [{ rotate: "-90deg" }],
          }}
        >
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
          <AnimatedCircle
            cx={CIRCLE_RADIUS}
            cy={CIRCLE_RADIUS}
            strokeLinecap="round"
            r={CIRCLE_RADIUS - STROKE_WIDTH / 2}
            stroke="url(#a)"
            strokeWidth={STROKE_WIDTH}
            fill={"transparent"}
            strokeDasharray={CIRCLE_LENGTH}
            animatedProps={animatedProps}
          />
        </Svg>
      </Animated.View>
    </Pressable>
  );
};

interface ShutterButtonProps {
  onPressPicture: () => void;
  onTakeVideo: () => void;
  onEndTakeVideo: () => void;
  maxDuration?: number;
}

const ShutterButton: React.FC<ShutterButtonProps> = ({
  onPressPicture,
  onTakeVideo,
  onEndTakeVideo,
  maxDuration = 10000,
}) => {
  return (
    <AnimatedPlayPauseButton
      onPress={onPressPicture}
      onTakeVideo={onTakeVideo}
      onEndTakeVideo={onEndTakeVideo}
      maxDuration={maxDuration}
    />
  );
};

export default ShutterButton;
