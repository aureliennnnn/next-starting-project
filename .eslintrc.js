module.exports = {
  extends: ["next/core-web-vitals", "@typescript-eslint/recommended", "prettier"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "accessibility"],
  rules: {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-empty-function": "off",
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    "accessibility/anchor-has-content": "error",
    "accessibility/aria-props": "error",
    "accessibility/aria-proptypes": "error",
    "accessibility/aria-role": "error",
    "accessibility/aria-unsupported-elements": "error",
    "accessibility/role-has-required-aria-props": "error",
    "accessibility/role-supports-aria-props": "error",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
}
