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
const userForm = reactive({
  username: "",
  password: "",
});
const router = useRouter();
const handleLogin = async () => {
  console.log(userForm.username, userForm.password);
  const res = await login(userForm);
  console.log(res);
  if (res.data.code === 200) {
    router.push("/home");
  }
};
</script>
