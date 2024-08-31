module.exports = {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.jsx?$": "babel-jest", // Use Babel for JavaScript files
  },
  transformIgnorePatterns: [
    "/node_modules/(?!(cheerio|react-toastify)/)", // Include specific modules to be transformed
  ],
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "<rootDir>/src/test/__mocks__/styleMock.js",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
};
