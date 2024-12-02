import { formatTime } from "@/utils/dates";
import { hapticImpact } from "@/utils/haptics";
import { useCamera } from "@hooks/useCamera";
import { useIsFocused } from "@react-navigation/native";
import { AVPlaybackStatus, Video } from "expo-av";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const VideoPlayerContext = createContext<{
  ref: React.RefObject<Video>;
  isMobile: boolean;
  localURI: string;
  isLoading: boolean;
  isMuted: boolean;
  isPlaying: boolean;
  timer: string;
  progressions: number[];
  setIsLoading: (value: boolean) => void;
  setIsMuted: (value: boolean) => void;
  onPlaybackStatusUpdate: (status: AVPlaybackStatus) => void;
  onPlay: () => void;
  onPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onEndQuestion: () => void;
  onRestart: () => void;
  setPositionMillis: (value: number) => void;
}>({
  ref: { current: null },
  isMobile: false,
  localURI: "",
  isLoading: false,
  isMuted: false,
  isPlaying: false,
  timer: "00:00",
  progressions: [0, 0],
  setIsLoading: () => {},
  setIsMuted: () => {},
  onPlaybackStatusUpdate: () => {},
  onPlay: () => {},
  onPause: () => {},
  onNext: () => {},
  onPrevious: () => {},
  onEndQuestion: () => {},
  onRestart: () => {},
  setPositionMillis: () => {},
});

export type VideoPlayerType =
  | "question"
  | "application"
  | "recruiter_presentation"
  | "recruiter_presentation_recording";

const VideoPlayerProvider = ({
  loop,
  isMobile,
  children,
  onGoBack,
  autoPlay,
}: {
  loop: boolean;
  isMobile: boolean;
  children: ReactNode;
  onGoBack?: () => void;
  autoPlay: boolean;
}) => {
  const {video} = useCamera();
  const ref = useRef<Video>(null);
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [durationMillis, setDurationMillis] = useState(0);
  const [positionMillis, setPositionMillis] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  // Stop Player if the screen isn't focused
  useEffect(() => {
    if (isFocused) return;
    ref.current?.stopAsync();
  }, [ref, isFocused]);

  useEffect(() => {
    if (autoPlay)
      // Small delay to make sure the animation of the first slide is visible
      setTimeout(() => {
      }, 200);
  }, [autoPlay]);

  const onEnd = () => {
    hapticImpact("medium");

    // if (videos.length === 1 && onGoBack) {
    //   ref.current?.unloadAsync();
    //   onGoBack();
    // }

    if (loop) {
      return;
    }

    ref.current?.stopAsync();
  };

  const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
    if ("positionMillis" in status) {
      setDurationMillis(status.durationMillis ?? 0);
      setPositionMillis(status.positionMillis);
      setIsPlaying(status.isPlaying);
      if (status.didJustFinish) onNext();
    }
  };

  const computeProgression = () => {
    return [0];
  };

  const resetPlayer = () => {
    ref.current?.stopAsync();
    ref.current?.unloadAsync();
    setPositionMillis(0);
    setDurationMillis(0);
  };

  const onNext = () => {
    resetPlayer();
    onEnd();
  };

  const onPrevious = () => {
    
  };

  const onEndQuestion = () => {
    ref.current?.playAsync();
  };

  const onRestart = () => {
    if (isPlaying) {
      ref.current?.stopAsync();
      setIsPlaying(false);
    }
  };

  const value = {
    ref,
    isMobile,
    localURI: video?.path || "",
    isLoading,
    setIsLoading,
    isMuted,
    setIsMuted,
    isPlaying,
    durationMillis,
    positionMillis,
    timer: formatTime(positionMillis, durationMillis),
    progressions: computeProgression(),
    onPlay: () => {
      hapticImpact("medium");
      if (positionMillis === 0) {
        // Avoid Chrome Bug on ios
        ref.current?.playAsync();
        ref.current?.pauseAsync();
        ref.current?.setPositionAsync(0);
        return;
      }
      ref.current?.playAsync();
      setIsPlaying(true);
    },
    onPause: () => {
      hapticImpact("medium");
      setIsPlaying(false);
      ref.current?.pauseAsync();
    },
    onNext,
    onPrevious,
    onPlaybackStatusUpdate,
    onEndQuestion,
    onRestart,
    setPositionMillis,
  };

  return (
    <VideoPlayerContext.Provider value={value}>
      {children}
    </VideoPlayerContext.Provider>
  );
};

export const useVideoPlayer = () => {
  return useContext(VideoPlayerContext);
};

export default VideoPlayerProvider;