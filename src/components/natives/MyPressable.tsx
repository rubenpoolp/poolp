import sleep from "@src/utils/sleep";
import React, { ComponentProps, useState } from "react";
import { GestureResponderEvent, Pressable } from "react-native";

interface MyPressableProps extends ComponentProps<typeof Pressable> {
  /** Keep the opacity when disabled */
  disabledFull?: boolean;
}

function MyPressable(props: MyPressableProps) {
  const { disabled, disabledFull = false, ...otherProps } = props;

  const [hovered, setHovered] = useState(false);

  const [disabledNoMultipleClick, setDisabledNoMultipleClick] = useState(false);

  const disableToAvoidMultipleClick = async () => {
    setDisabledNoMultipleClick(true);
    await sleep(1000);
    setDisabledNoMultipleClick(false);
  };

  return (
    <Pressable
      disabled={disabled || disabledFull || disabledNoMultipleClick}
      onHoverIn={() => setHovered(true)}
      onHoverOut={() => setHovered(false)}
      {...otherProps}
      onPress={(event: GestureResponderEvent) => {
        disableToAvoidMultipleClick();
        props.onPress?.(event);
      }}
      // @ts-ignore
      style={({ pressed }) => [
        {
          opacity: pressed || disabled ? 0.3 : hovered ? 0.7 : 1,
        },
        otherProps.style,
      ]}
    />
  );
}

export default MyPressable;
