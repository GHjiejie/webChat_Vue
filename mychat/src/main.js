import { createApp } from "vue";
import router from "./router/index";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

import "./assets/font/iconfont.js";
import SvgIcon from "@/components/SvgIcon/index.vue";
import "virtual:svg-icons-register";
import { SERVER_URL } from "@/config/base.config.js";

import App from "./App.vue";
const app = createApp(App);

app.provide("server_url", SERVER_URL);

app.use(router);
// app.use(initSvgIcon);
app.use(ElementPlus);
app.component("svg-icon", SvgIcon);

app.mount("#app");
