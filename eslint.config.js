import typescript from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: "./tsconfig.json",
      },
      globals: {
        process: "readonly",
        console: "readonly",
        Buffer: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": typescript,
    },
    rules: {
      // TypeScript essentials
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-var-requires": "error",
      "@typescript-eslint/prefer-optional-chain": "error",

      // Essential code quality
      "no-console": "warn",
      "no-debugger": "error",
      eqeqeq: ["error", "always"],
    },
  },
  eslintConfigPrettier,
  {
    ignores: ["build/**", "dist/**", "node_modules/**", "coverage/**"],
  },
];
