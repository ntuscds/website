module.exports = {
  parser: "@typescript-eslint/parser",
  env: {
    es2021: true,
  },
  ignorePatterns: [
    "**/out/*",
    "**/dist/*",
    "**/build/*",
    "**/.next/*",
    "**/storybook-static/*",
    "**/node_modules/*",
  ],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "next/core-web-vitals",
    "turbo",
    "prettier",
    "plugin:storybook/recommended",
  ],
  plugins: ["cypress", "@typescript-eslint"],
  rules: {
    // common
    "object-curly-spacing": ["error", "always"],
    //  next
    "@next/next/no-html-link-for-pages": "off",
    // react
    "react/jsx-key": "off",
    "react/display-name": "off",
    // cypress
    "cypress/no-assigning-return-values": "error",
    "cypress/no-unnecessary-waiting": "error",
    "cypress/assertion-before-screenshot": "warn",
    "cypress/no-force": "warn",
    "cypress/no-async-tests": "error",
    "cypress/no-pause": "error",
  },
  overrides: [
    // typescript
    {
      files: ["*.ts", "*.tsx"],
      extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
      ],
      plugins: ["@typescript-eslint"],
      rules: {
          "@typescript-eslint/no-misused-promises": ["error", {
            "checksVoidReturn": {
              "attributes": false
            }
          }],
        "@typescript-eslint/no-empty-interface": ["off", "never"],
        "@typescript-eslint/no-unused-vars": [
          "error",
          { argsIgnorePattern: "^_" },
        ],
        "@typescript-eslint/naming-convention": [
          "warn",
          {
            selector: "function",
            format: ["camelCase", "PascalCase"],
          },
        ],
        "@typescript-eslint/no-unsafe-assignment": "off",
        "@typescript-eslint/no-unsafe-call": "off",
      },
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: [
          "../../packages/**/tsconfig.json",
          "../../apps/**/tsconfig.json",
        ],
      },
    },

    // react (non-next)
    {
      files: ["apps/cms/**/*.tsx"],
      rules: {
        "@next/next/no-img-element": ["off", "never"],
      },
    },

    //storybook
    {
      files: ["**/*.stories.*", "**/*.story.*"],
      rules: {
        "@typescript-eslint/await-thenable": ["off", "never"], // enable stepping back in storybook debugger
      },
    },
  ],
};
