import { createApp } from "vue";
import router from "./router/index";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
// import "./assets/font/font.css";
import "./assets/font/iconfont.js";

import initSvgIcon from "@/assets/icons/index";
import { SERVER_URL } from "@/config/base.config";

import App from "./App.vue";
const app = createApp(App);

app.provide("server_url", SERVER_URL);

app.use(router);
app.use(initSvgIcon);
app.use(ElementPlus);

app.mount("#app");
