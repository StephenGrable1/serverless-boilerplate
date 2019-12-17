const utils = require("./src/global-variables/utils");
const config = {
  verbose: true,
  rootDir: "./src",
  testEnvironment: "enzyme",
  testEnvironmentOptions: {
    enzymeAdapter: "react16"
  },
  globals: {
    utils: { utils: { ...utils } }
  },
  transform: {
    "^.+\\.js$": "babel-jest",
    "^.+\\.jsx$": "babel-jest"
  },
  moduleNameMapper: {
    "^.+\\.(css|less|scss)$": "babel-jest",
    "^.+\\.(png|wav)$": "identity-obj-proxy"
  },
  moduleFileExtensions: ["js", "jsx"]
};

module.exports = config;
