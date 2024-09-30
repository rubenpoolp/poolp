// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require("./config/colors");

module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors,
    extend: {},
  },
  plugins: [],
};
