export default {
  expo: {
    name: process.env.APP_NAME || "Poolp",
    slug: "poolp",
    scheme: "poolp",
    version: "0.0.1",
    orientation: "portrait",
    icon: "./assets/logo/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/logo/splash.png",
      resizeMode: "cover",
      backgroundColor: "#1C1D21",
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: false,
      bundleIdentifier: "app.poolp",
      config: {
        usesNonExemptEncryption: false,
      },
    },
    android: {
      googleServicesFile: "./google-services.json",
      adaptiveIcon: {
        foregroundImage: "./assets/logo/adaptiveIcon.png",
        backgroundImage: "./assets/logo/backgroundImage.png",
        backgroundColor: "#1C1D21",
      },
      package: "app.poolp",
    },
    plugins: [
      "expo-font",
      "expo-localization",
      [
        "react-native-vision-camera",
        {
          cameraPermissionText: "Allow poolp to access your camera",
          // microphonePermissionText: "Allow poolp to access your microphone",
          // enableMicrophonePermission: true,
        },
      ],
      [
        "expo-media-library",
        {
          photosPermission: "Allow poolp to access your photos.",
          savePhotosPermission: "Allow poolp to save photos.",
          isAccessMediaLocationEnabled: true,
        },
      ],
      [
        "@sentry/react-native/expo",
        {
          url: "https://sentry.io/",
          project: "poolp",
          organization: "poolp",
        },
      ],
      [
        "expo-tracking-transparency",
        {
          userTrackingPermission:
            "It permits us to improve your experience by providing us with data on how you use the app.",
        },
      ],
    ],
    extra: {
      eas: {
        projectId: "060248c2-990f-4b22-80ac-a0682fffbef9",
      },
    },
    owner: "poolp",
    runtimeVersion: {
      policy: "appVersion",
    },
  },
};
