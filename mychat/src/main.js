import { createApp } from "vue";
import router from "./router/index";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
// import "./assets/font/font.css";
import "./assets/font/iconfont.js";
import initSvgIcon from "@/assets/icons/index";
import App from "./App.vue";

const app = createApp(App);

app.use(router);
app.use(initSvgIcon);
app.use(ElementPlus);
app.mount("#app");
