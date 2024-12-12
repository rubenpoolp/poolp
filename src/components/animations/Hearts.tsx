import Heart from "@components/SVGs/Heart";
import shadow from "@config/shadow";
import { useEffect, useRef } from "react";
import { Animated, Dimensions, View } from "react-native";
import { Easing } from "react-native-reanimated";

const { width, height } = Dimensions.get("window");

const HeartItem = ({ style }: { style: any }) => (
  <Animated.View style={style}>
    <Heart style={shadow.purple} />
  </Animated.View>
);

const Hearts = ({ isVisible, yOffset }: { isVisible: boolean, yOffset?: number }) => {
  const hearts = Array(40)
    .fill(0)
    .map(() => ({
      position: useRef(new Animated.Value(height - 100)).current,
      xOffset: Math.random() * width,
      delay: Math.random() * 2000,
      duration: 3000 + Math.random() * 2000,
    }));

  useEffect(() => {
    if (isVisible) {
      hearts.forEach((heart) => {
        heart.position.setValue(height - 100);
      });

      hearts.forEach((heart) => {
        Animated.sequence([
          Animated.delay(heart.delay),
          Animated.timing(heart.position, {
            toValue: -150,
            duration: heart.duration,
            easing: Easing.out(Easing.bezierFn(0.79, 0.4, 0.83, 0.65)),
            useNativeDriver: true,
          }),
        ]).start(() => {
          heart.position.setValue(height - 120);
        });
      });
    }
  }, [hearts, isVisible]);

  if (!isVisible) return null;


  const style = yOffset ? { transform: [{ translateY: yOffset }] } : {};

  return (
    <View className="absolute w-full h-full" style={style}>
      {hearts.map((heart, index) => (
        <HeartItem
          key={index}
          style={{
            position: "absolute",
            left: heart.xOffset,
            transform: [{ translateY: heart.position }],
          }}
        />
      ))}
    </View>
  );
};

export default Hearts;
