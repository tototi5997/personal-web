module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "plugin:react-hooks/recommended"],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    // 未使用的定义的变量
    "@typescript-eslint/no-unused-vars": "warn",
    // 一个文件只 exports 一个变量
    "react-refresh/only-export-components": "off",
    // useEffect 必须设置依赖
    "react-hooks/exhaustive-deps": "off",
    // 使用 any
    "@typescript-eslint/no-explicit-any": "warn",
  },
};
