module.exports = {
  env: {
    jest: true, // This tells ESLint that Jest globals are available
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:jest/recommended", // Include Jest plugin if used
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "jest"],
  rules: {
    // Your custom rules here
  },
};
