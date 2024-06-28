<template>
  <div class="login">
    <h1>Login</h1>

    <input type="text" v-model="userForm.username" placeholder="Username" />
    <input type="password" v-model="userForm.password" placeholder="Password" />
    <button @click="handleLogin">login</button>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { login } from "@/apis/user";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
const userForm = reactive({
  username: "admin",
  password: "12345",
});
const router = useRouter();
const handleLogin = async () => {
  console.log(userForm.username, userForm.password);
  const res = await login(userForm);
  console.log("输出res", res);
  if (res.data.code === 200) {
    // 将当前登录的用户ID存储到localStorage中
    localStorage.setItem("userId", res.data.data._id);
    router.push("/");
  } else {
    ElMessage.error("登录失败");
  }
};
</script>
