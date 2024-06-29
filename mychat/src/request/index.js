import axios from "axios";
import router from "@/router/index.js";

const service = axios.create({
  baseURL: "http://localhost:9000",
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.authorization = `${token}`;
    }
    return config;
  },
  (error) => {
    console.error("请求拦截错误:", error);
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const { authorization } = response.headers;
    if (authorization) {
      localStorage.setItem("token", authorization);
    }
    if (response.data.code === 401) {
      router.push("/login");
      return Promise.reject(new Error("未授权，请重新登录"));
    }
    return response;
  },
  (error) => {
    if (error.response) {
      // 请求已发出，但服务器响应了状态码不是2xx
      console.error("响应拦截错误数据:", error.response.data);
      console.error("响应拦截错误状态:", error.response.status);
      console.error("响应拦截错误头:", error.response.headers);

      if (error.response.status === 401) {
        router.push("/login");
      }
    } else {
      // 请求未发出
      console.error("请求错误:", error.message);
    }
    return Promise.reject(error);
  }
);

export default service;
