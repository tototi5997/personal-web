import { useEffect, useState } from "react";

const useTheme = () => {
  const DEFAULT_THEME = "dark";

  // 从 localStorage 获取保存的主题，如果没有则默认为 'light'
  const [theme, setTheme] = useState(localStorage.getItem("theme") || DEFAULT_THEME);

  // 切换主题的方法
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    // 将新主题保存到 localStorage
    localStorage.setItem("THEME", newTheme);
    // 更新 body 的 data-theme 属性
    document.body.setAttribute("data-theme", newTheme);
  };

  // 在组件挂载时设置主题（基于初始状态或 localStorage）
  // 当 theme 变化时重新运行
  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  return { theme, toggleTheme };
};

export default useTheme;
