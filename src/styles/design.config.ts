import { ThemeConfig } from "antd";

export const DESIGN_CONFIG: Record<"Button", ThemeConfig> = {
  Button: {
    token: {
      // 主题色
      colorPrimary: "#6E54D4",
    },
    components: {
      Button: {
        // 默认背景色
        defaultBg: "#6E54D4",
      },
    },
  },
};
