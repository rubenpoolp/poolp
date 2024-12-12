declare module 'react-native-video-processing' {
  interface OverlayOptions {
    source: string;
    overlay: string;
    position: {
      x: number;
      y: number;
    };
  }

  export default class ProcessingManager {
    static overlay(options: OverlayOptions): Promise<string>;
  }
} 