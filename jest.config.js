module.exports = {
  moduleNameMapper: {
    "\\.(css|scss)$": "identity-obj-proxy",
    "^../../assets/images/(.*)": "<rootDir>/__mocks__/assets/images/$1.js",
    "^react-icons/(.*)$": "<rootDir>/__mocks__/react-icons/$1.js",
    "^react-owl-carousel$": "<rootDir>/__mocks__/react-owl-carousel.js",
  },
  testEnvironment: "jsdom",

  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },

  setupFilesAfterEnv: ["@testing-library/jest-dom"],
};
