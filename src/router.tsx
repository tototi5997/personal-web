import { HashRouter, BrowserRouter, RouteObject } from "react-router-dom";
import Home from "./pages/Home";
import NotFoundPage from "./pages/404";

export type RouterType = "hash" | "browser";

// 当前路由模式
const ROUTER_TYPE: RouterType = "browser";

// 路由类型
const routerMap = {
  hash: HashRouter,
  browser: BrowserRouter,
};

export const RouterComponent = routerMap[ROUTER_TYPE];

// 路由配置
export const routerConfig: RouteObject[] = [
  { path: "/", element: <Home /> },
  // 404 放在最下面
  {
    path: "*",
    element: <NotFoundPage />,
  },
];
