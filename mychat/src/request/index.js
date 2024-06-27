import axios from "axios";
import { useRouter } from "vue-router";
const router = useRouter();
const service = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 3000,
});
service.interceptors.request.use(
  (config) => {
    console.log("请求拦截");
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = token;
    } else {
      console.log("token不存在");
      router.push("/login");
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    console.log();
    // 判断是否有token，如果没有，跳转到登录页面
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default service;
