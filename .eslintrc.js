const path = require("path");

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/jsx-runtime", "standard-with-typescript", "prettier"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    tsconfigRootDir: path.resolve(__dirname),
    project: "tsconfig.json",
  },
  plugins: ["react"],
  rules: {
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/consistent-type-definitions": "off",
  },
};
