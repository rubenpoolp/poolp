import FinalVideoPlayerProvider, { useVideoPlayer } from "@context/VideoPlayerContext";
import i18n from "@utils/i18n";
import { ResizeMode, Video } from "expo-av";
import { Alert } from "react-native";

const VideoPlayerWithContext = () => {  
  const { 
    loop,
    autoPlay,
    video,
    videoComponentRef,
    isLoading,
    onLoad,
    onLoadStart,
    onPlaybackStatusUpdate,
  } = useVideoPlayer();

  return (
    <Video
      ref={videoComponentRef}
      useNativeControls={false}
      
      shouldPlay={autoPlay}
      isLooping={loop}

      source={{ uri: `file://${video?.path}` }}
      resizeMode={ResizeMode.COVER}
      onLoad={onLoad}
      onLoadStart={onLoadStart}
      
      className="w-full h-full rounded-t-[32px]"
      videoStyle={{
        flex: 1,
        height: "100%",
        width: "100%",
      }}
      onPlaybackStatusUpdate={(status) => {
        if (!status.isLoaded) {
          if (status.error) {
            Alert.alert(
              i18n.t("utils.error"),
              i18n.t("utils.errorOccured"),
            );
          }
          return;
        }
        onPlaybackStatusUpdate(status);
      }}
      onError={(error) => {
        console.warn("On Error Video expo-av", error, video?.path);
      }}
    />
  )
}

interface VideoPlayerProps {
  loop?: boolean;
  autoPlay?: boolean;
  video: { path: string } | null;
}

const VideoPlayer = ({
  loop = true,
  autoPlay = true,
  video,
}: VideoPlayerProps) => {
  return (
    <FinalVideoPlayerProvider
      loop={loop}
      autoPlay={autoPlay}
      video={video}
    >
      <VideoPlayerWithContext/>
    </FinalVideoPlayerProvider>
  )
}

export default VideoPlayer;