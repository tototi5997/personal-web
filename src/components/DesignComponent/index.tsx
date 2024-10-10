import { ConfigProvider, ThemeConfig } from "antd";

interface IDesignComponent {
  children?: React.ReactNode;
  theme?: ThemeConfig;
}
const DesignComponent: React.FC<IDesignComponent> = ({ children, theme }) => {
  return <ConfigProvider theme={theme}>{children}</ConfigProvider>;
};

export default DesignComponent;
