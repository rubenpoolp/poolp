module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["."],
          alias: {
            "@/*": "./src/",
            "@config": "./config/",
            "@assets": "./assets/",
          },
        },
      ],
      [
        "module:react-native-dotenv",
        {
          moduleName: "@env",
          path: ".env",
          blacklist: null,
          whitelist: null,
          safe: false,
          allowUndefined: true,
        },
      ],
      "@babel/plugin-proposal-export-namespace-from",
      "nativewind/babel",
      "react-native-reanimated/plugin", // Should be placed last
    ],
  };
};
