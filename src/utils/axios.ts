import { message } from "antd";
import axios from "axios";

const service = axios.create({
  baseURL: "/explorer",
  timeout: 10000,
  // withCredentials: true,
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // const token = Cookie.get("token");
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (res) => res.data,
  (error) => {
    // 提取错误信息
    const errorMessage = error.response?.data?.message || error.message || "请求失败";
    message.error(errorMessage);

    return Promise.reject(error);
  }
);

export default service;
