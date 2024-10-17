import React, { type ReactElement, useEffect, useRef } from "react";
import { Animated, View } from "react-native";

interface PaginationProps {
  index: number;
  duration: number;
  total: number;
}

const StoryBarLoader = ({
  index,
  duration = 5000,
  total,
}: PaginationProps): ReactElement => {
  const animationValue = useRef<Animated.Value>(new Animated.Value(0)).current;

  useEffect(() => {
    animationValue.setValue(0);
    Animated.timing(animationValue, {
      toValue: 1,
      duration: duration,
      useNativeDriver: false,
    }).start();
  }, [index]);

  return (
    <View className={"w-full z-0"}>
      <View className={`w-full flex-row justify-center items-center`}>
        {total > 1 &&
          [...Array(total)].map((_, i) => (
            <View
              key={i}
              className={`flex-1 h-1 rounded-full mx-1 ${
                i < index ? "bg-light" : "bg-gray-200"
              }`}
            >
              {i === index && (
                <Animated.View
                  key={i}
                  className={"bg-light h-1 rounded-full "}
                  style={{
                    width: animationValue.interpolate({
                      inputRange: [0, 1],
                      outputRange: ["0%", "100%"],
                    }),
                  }}
                />
              )}
            </View>
          ))}
      </View>
    </View>
  );
};

export default StoryBarLoader;
