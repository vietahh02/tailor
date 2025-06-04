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
      // Cho phép dùng 'any' tạm thời
      "@typescript-eslint/no-explicit-any": "off",

      // Cảnh báo thay vì lỗi khi có biến không dùng
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],

      // Bỏ yêu cầu alt cho <img> (chỉ khi cần)
      "jsx-a11y/alt-text": "off",

      // Cảnh báo thay vì lỗi nếu thiếu deps trong useEffect
      "react-hooks/exhaustive-deps": "warn",

      // Cho phép không khai báo displayName cho component
      "react/display-name": "off",

      // Bỏ cảnh báo khi dùng <img>
      "@next/next/no-img-element": "off",
    },
  },
];

export default eslintConfig;
