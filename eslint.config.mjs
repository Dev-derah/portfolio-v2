import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Ignore unused variables (prefix variables with an underscore to suppress warnings)
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { varsIgnorePattern: "^_", argsIgnorePattern: "^_" },
      ],
      // Allow unescaped single quotes in JSX
      "react/no-unescaped-entities": [
        "warn",
        {
          forbid: [
            {
              char: "'",
              alternatives: ["&apos;", "&#39;", "&lsquo;", "&rsquo;"],
            },
          ],
        },
      ],
    },
  },
];

export default eslintConfig;
