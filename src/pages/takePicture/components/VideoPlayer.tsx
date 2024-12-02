import { purple } from "@config/colors";
import VideoPlayerProvider, {
  useVideoPlayer,
} from "@context/VideoPlayer";
import { useNavigation } from "@react-navigation/native";
import i18n from "@utils/i18n";
import { Audio, ResizeMode, Video } from "expo-av";
import React, { useEffect } from "react";
import { ActivityIndicator, Alert, View } from "react-native";

const VideoPlayerWithContext = ({
  loop,
  onGoBack,
  onError,
}: {
  externalPadding: number;
  loop?: boolean;
  onGoBack?: () => void;
  onError?: () => void;
}) => {
  const {
    ref,
    localURI,
    isMuted,
    onPlaybackStatusUpdate,
    isLoading,
    setIsLoading,
    setPositionMillis,
  } = useVideoPlayer();
  const myIsLoading = isLoading || !localURI;
  const navigation = useNavigation();

  useEffect(() => {
    Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
  }, []);

  return (
    <View className="flex-1 flex-row justify-center items-center">
        {/* Avoid white screen between transitions */}
        {/* {thumbnail ? (
          <Image
            source={{ uri: thumbnail }}
            className="absolute w-full h-full"
          />
        ) : (
          <View className="absolute w-full h-full bg-black" />
        )} */}

        {myIsLoading && (
          <ActivityIndicator
            color={purple[100]}
            size="large"
            className="absolute top-0 bottom-0 self-center z-10"
          />
        )}

        <Video
          ref={ref}
          shouldPlay={true}
          useNativeControls={false}
          className="flex-1"
          videoStyle={{
            flex: 1,
            height: "100%",
            width: "100%",
          }}
          source={{
            uri: localURI,
          }}
          posterStyle={{
            objectFit: "cover",
            width: "100%",
            height: "100%",
          }}
          usePoster={false}
          resizeMode={ResizeMode.COVER}
          isMuted={isMuted}
          onLoadStart={() => setIsLoading(true)}
          onLoad={() => {
            setIsLoading(false);
            setPositionMillis(0);
            ref.current?.setPositionAsync(0);
          }}
          
          onPlaybackStatusUpdate={(status) => {
            console.log("onPlaybackStatusUpdate", status);
            if (!status.isLoaded) {
              if (status.error) {
                if (onError) return onError();
                Alert.alert(
                  i18n.t("utils.error"),
                  i18n.t("errors.errorOccured"),
                );
              }
              return;
            }
            setIsLoading(false);
            onPlaybackStatusUpdate(status);
          }}
          onError={(error) => {
            console.warn("On Error Video expo-av", error, localURI);
          }}
        />
    </View>
  );
};

interface VideoPlayerProps {
  loop?: boolean;
  externalPadding?: number;
  isMobile?: boolean;
  onGoBack?: () => void;
  onError?: () => void;

  autoPlay?: boolean;
}

const VideoPlayer = ({
  loop = false,
  onGoBack,
  onError,
  externalPadding = 0,
  isMobile = false,
  autoPlay = false,
}: VideoPlayerProps) => {
  return (
    <VideoPlayerProvider
      loop={loop}
      onGoBack={onGoBack}
      isMobile={isMobile}
      autoPlay={autoPlay}
    >
      <VideoPlayerWithContext
        externalPadding={externalPadding}
        onGoBack={onGoBack}
        onError={onError}
        loop={loop}
      />
    </VideoPlayerProvider>
  );
};

export default VideoPlayer;