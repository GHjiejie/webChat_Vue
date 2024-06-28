import axios from "axios";
import { useRouter } from "vue-router";
const router = useRouter();
const service = axios.create({
  baseURL: "http://localhost:9000",
});
service.interceptors.request.use(
  (config) => {
    // console.log("请求拦截");
    const token = localStorage.getItem("token");
    //  将authorization设置到请求头里面,确保后面的每一次请求都会携带token
    config.headers.authorization = `${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    // console.log("响应拦截", response);
    const { authorization } = response.headers;
    // 将authorization设置到sessionStorage里面;
    localStorage.setItem("token", authorization);
    if (response.data.code === 401) {
      router.push("/login");
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default service;
