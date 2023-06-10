/** @type {import('jest').Config} */
const config = {
  verbose: true,
  transform: {
    "\\.[jt]sx?$": "babel-jest",
  },
  testEnvironment: "jsdom"
};

module.exports = config;