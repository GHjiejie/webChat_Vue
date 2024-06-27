<template>
  <div class="register">
    <h1>Register</h1>

    <input type="text" v-model="userForm.username" placeholder="Username" />
    <input type="password" v-model="userForm.password" placeholder="Password" />
    <button @click="handleRegister">Register</button>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { register } from "@/apis/user";
const userForm = reactive({
  username: "",
  password: "",
});
const handleRegister = async () => {
  console.log(userForm.username, userForm.password);
  const res = await register(userForm);
  console.log(res);
};
</script>
