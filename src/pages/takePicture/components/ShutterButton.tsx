import React, { useEffect, useState } from "react";
import { Pressable, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import Svg, { Circle, LinearGradient, Stop } from "react-native-svg";

const HOLD_TIME_FOR_VIDEO = 500;
const CIRCLE_RADIUS = 40;
const STROKE_WIDTH = 8;

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export const AnimatedPlayPauseButton = ({
  onPress,
  onEndHold,
}: {
  onPress: () => void;
  onEndHold: () => void;
}) => {
  const [timeHolded, setTimeHolded] = useState(0);
  const [isPressed, setIsPressed] = useState(false);
  const isHolding = useSharedValue(false);
  const rotation = useSharedValue(0);
  const progress = useSharedValue(0);

  useEffect(() => {
    let holdTimer: NodeJS.Timeout;

    if (isPressed && timeHolded !== 0) {
      holdTimer = setTimeout(() => {
        isHolding.value = true;
        progress.value = withRepeat(
          withTiming(1, {
            duration: 2000,
            easing: Easing.linear,
          }),
          -1,
        );
        rotation.value = withRepeat(
          withSequence(
            withTiming(360, {
              duration: 2000,
              easing: Easing.linear,
            }),
          ),
          -1,
        );
      }, HOLD_TIME_FOR_VIDEO);
    }

    return () => {
      if (holdTimer) {
        clearTimeout(holdTimer);
      }
    };
  }, [isPressed, timeHolded]);

  const circleAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotateZ: `${rotation.value}deg` }],
      opacity: isHolding.value ? 1 : 0,
    };
  });

  const stopHoldAnimation = () => {
    isHolding.value = false;
    rotation.value = withTiming(0);
    progress.value = withTiming(0);
  };

  const animatedProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: progress.value * (CIRCLE_RADIUS * 2),
      backgroundColor: "#7826FD",
    };
  });

  return (
    <Pressable
      className="items-center justify-center h-20"
      onPressIn={() => {
        setIsPressed(true);
        setTimeHolded(new Date().getTime());
      }}
      onTouchEnd={() => {
        setIsPressed(false);
        const currentTime = new Date().getTime();

        if (timeHolded < currentTime - HOLD_TIME_FOR_VIDEO) {
          onEndHold();
          stopHoldAnimation();
        } else {
          onPress();
        }
        setTimeHolded(0);
      }}
    >
      <View
        className={`border-gray-200 rounded-full absolute`}
        style={{
          width: CIRCLE_RADIUS * 2,
          height: CIRCLE_RADIUS * 2,
          borderWidth: STROKE_WIDTH,
        }}
      />

      <Svg
        style={{
          width: CIRCLE_RADIUS * 2,
          height: CIRCLE_RADIUS * 2,
          alignItems: "center",
          justifyContent: "center",
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
          fill="transparent"
          stroke="url(#a)"
          strokeWidth={STROKE_WIDTH}
          strokeLinecap="round"
          r={CIRCLE_RADIUS - STROKE_WIDTH / 2}
          {...animatedProps}
        />
      </Svg>
      <Animated.View
        className={`rounded-full absolute bg-[#B595E9]`}
        style={[
          circleAnimatedStyle,
          {
            width: CIRCLE_RADIUS * 2,
            height: CIRCLE_RADIUS * 2,
          },
        ]}
      >
        <View className="w-2 h-2 bg-[#7826FD] rounded-full absolute left-1/2 transform -translate-x-1.5" />
      </Animated.View>
    </Pressable>
  );
};

interface ShutterButtonProps {
  onPressPicture: () => void;
  onHoldVideo: () => void;
}

const ShutterButton: React.FC<ShutterButtonProps> = ({
  onPressPicture,
  onHoldVideo,
}) => {
  return (
    <AnimatedPlayPauseButton onPress={onPressPicture} onEndHold={onHoldVideo} />
  );
};

export default ShutterButton;
