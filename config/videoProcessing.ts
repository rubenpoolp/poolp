export const videoProcessingConfig = {
  // Video quality settings
  videoBitrate: "6M", // Video bitrate (higher = better quality, larger file)
  videoLevel: "4.0", // H.264 level

  // Overlay quality settings
  overlayQuality: 1, // PNG capture quality (0 to 1)
  overlayFormat: "png" as const, // Capture format

  // Output settings
  outputFormat: "mp4", // Output video format
  maintainOriginalQuality: true, // If true, uses high bitrate
};

// Helper to generate FFmpeg parameters
export const generateFFmpegParams = () => {
  const params = [
    `-b:v ${videoProcessingConfig.videoBitrate}`, // Set video bitrate
    `-level ${videoProcessingConfig.videoLevel}`, // Set H.264 level
  ];

  return params.join(" ");
};
