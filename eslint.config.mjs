import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

// Extends two key Next.js ESLint configurations:
// next/core-web-vitals: Best practices for Core Web Vitals
// next/typescript: TypeScript-specific rules
const eslintConfig = [
    ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default eslintConfig;
