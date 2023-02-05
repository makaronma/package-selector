/** @type {import('eslint').Linter.Config} */
module.exports = {
  env: {
    node: true,
  },
  root: true,
  settings: {
    react: {
      version: "detect",
    },
  },
  ignorePatterns: ["*.js",],
  extends: [
    "eslint:recommended",
    "react-app",
    "react-app/jest",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
  ],
  overrides: [],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json"],
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    "@typescript-eslint/no-unused-vars": [0],
    "@typescript-eslint/no-empty-function": [0],
    "@typescript-eslint/no-empty-interface": [0],
    quotes: ["error", "double"],
  },
};