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
      infoPlist: {
        NSLocationWhenInUseUsageDescription:
          "Poolp needs access to location when open to give you the best experience.",
      },
    },
    android: {
      googleServicesFile: process.env.GOOGLE_SERVICES_JSON,
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
          cameraPermissionText:
            "Allow poolp to access your camera to send photos and videos to your friends.",
          microphonePermissionText:
            "Allow poolp to access your microphone to send videos to your friends.",
          enableMicrophonePermission: true,
        },
      ],
      [
        "expo-image-picker",
        {
          photosPermission:
            "The app accesses your photos to let you share them with your friends.",
        },
      ],
      [
        "@sentry/react-native/expo",
        {
          url: "https://sentry.io/",
          project: "react-native",
          organization: "poolp-rp",
        },
      ],
      [
        "expo-tracking-transparency",
        {
          userTrackingPermission:
            "It permits us to improve your experience by providing us with data on how you use the app.",
        },
      ],
      [
        "expo-av",
        {
          microphonePermission:
            "Allow $(PRODUCT_NAME) to access your microphone to send video to your friends.",
        },
      ],
      ["@config-plugins/ffmpeg-kit-react-native"],
      "expo-build-properties",
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
    updates: {
      url: "https://u.expo.dev/060248c2-990f-4b22-80ac-a0682fffbef9",
    },
  },
};
