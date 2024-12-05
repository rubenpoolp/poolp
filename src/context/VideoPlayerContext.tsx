import { AVPlaybackStatus, Video } from "expo-av";
import { createContext, ReactNode, useContext, useRef, useState } from "react";

export const VideoPlayerContext = createContext<{
  video: { path: string } | null;
  loop: boolean;
  autoPlay: boolean;
  videoComponentRef: React.RefObject<Video>;

  isLoading: boolean;
  isPlaying: boolean;
  onLoad: () => void;
  onLoadStart: () => void;
  onPlaybackStatusUpdate: (status: AVPlaybackStatus) => void;

  onPlay: () => void;
  onPause: () => void;

  resetPlayer: () => void;
}>({
  video: null,
  loop: true,
  autoPlay: true,
  videoComponentRef: { current: null },
  
  isPlaying: false,
  isLoading: false,

  onLoad: () => {},
  onLoadStart: () => {},
  onPlaybackStatusUpdate: () => {},

  onPlay: () => {},
  onPause: () => {},
  resetPlayer: () => {},
});

const VideoPlayerProvider = ({ 
  loop,
  autoPlay,
  video,
  children,
}: {
  video: { path: string } | null;
  
  loop: boolean;
  autoPlay: boolean;
  
  children: ReactNode;
}) => {
  const videoComponentRef = useRef<Video>(null);
  
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const [durationMillis, setDurationMillis] = useState(0);
  const [positionMillis, setPositionMillis] = useState(0);
  
  const onLoad = () => {
    setIsLoading(false);
    videoComponentRef.current?.setPositionAsync(0);
  };

  const onLoadStart = () => {
    setIsLoading(true);
  };

  const onPlay = () => {
    setIsPlaying(true);
    videoComponentRef.current?.playAsync();
  };

  const onPause = () => {
    setIsPlaying(false);
    videoComponentRef.current?.pauseAsync();
  };

  const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    setIsLoading(false);
    if ("positionMillis" in status) {
      setDurationMillis(status.durationMillis ?? 0);
      setPositionMillis(status.positionMillis);
      setIsPlaying(status.isPlaying);
    }
  };

  const resetPlayer = () => {
    videoComponentRef.current?.stopAsync();
    videoComponentRef.current?.unloadAsync();
    setDurationMillis(0);
    setPositionMillis(0);
  };


  return (
    <VideoPlayerContext.Provider 
      value={{ 
        video, 
        loop, 
        autoPlay,
        videoComponentRef,
        isPlaying,
        isLoading,
        onLoad,
        onLoadStart,
        onPlaybackStatusUpdate,
        onPlay,
        onPause,
        resetPlayer,
      }}
    >
      {children}
    </VideoPlayerContext.Provider>
  );
};

export const useVideoPlayer = () => {
  return useContext(VideoPlayerContext);
};

export default VideoPlayerProvider;