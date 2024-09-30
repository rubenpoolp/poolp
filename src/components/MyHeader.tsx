import { ReactNode } from "react";
import { View } from "react-native";
import BackButton from "./buttons/BackButton";
import MyText from "./natives/MyText";

interface MyHeaderProps {
  tight?: boolean;
  className?: string;
  logo?: boolean;
  title?: string;
  titleComponent?: ReactNode;
  canGoBack?: boolean;
  children?: ReactNode;
  rightComponent?: ReactNode;
  theme?: "dark" | "white";
}

const MyHeader = ({
  className,
  tight = false,
  title,
  titleComponent,
  canGoBack = false,
  children,
  rightComponent,
  theme = "dark",
}: MyHeaderProps) => {
  const Title = () => (
    <>
      {titleComponent && titleComponent}
      {!titleComponent && title && (
        <MyText className={`font-semibold text-base text-${theme}`}>
          {title}
        </MyText>
      )}
    </>
  );

  return (
    <View
      className={`w-full justify-between items-center flex-row pb-4 ${tight && "px-3"} ${className}`}
    >
      <View
        className={`${canGoBack && "-ml-2"} flex-row items-center justify-between`}
      >
        {canGoBack && <BackButton theme={theme} />}
      </View>
      <Title />
      {children}
      {rightComponent ? rightComponent : <View className="w-7" />}
    </View>
  );
};

export default MyHeader;
