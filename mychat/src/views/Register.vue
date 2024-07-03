<template>
  <div class="register-container">
    <div class="register-card">
      <h1>Register</h1>

      <input type="text" v-model="userForm.username" placeholder="Username" />
      <input
        type="password"
        v-model="userForm.password"
        placeholder="Password"
      />
      <button @click="handleRegister">Register</button>
      <el-button @click="handleLogin" link>Login</el-button>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { register } from "@/apis/user";
import { ElMessage } from "element-plus";
const router = useRouter();
const userForm = reactive({
  username: "",
  password: "",
});
const handleRegister = async () => {
  // console.log(userForm.username, userForm.password);
  if (!userForm.username || !userForm.password) {
    ElMessage.error("用户名或密码不能为空");
    return;
  }
  const res = await register(userForm);
  if (res.data.code === 200) {
    ElMessage.success("注册成功");
  } else if (res.data.code === 409) {
    ElMessage.error("当前用户已存在，请直接登录");
  } else {
    ElMessage.error("注册失败");
  }
};
const handleLogin = () => {
  router.push("/login");
};
</script>
<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}

.register-card {
  background-color: #fff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 350px;
}

h1 {
  margin-bottom: 20px;
  font-size: 2em;
  color: #333;
}

input[type="text"],
input[type="password"] {
  width: 80%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1em;
}

input[type="text"]:focus,
input[type="password"]:focus {
  border-color: #66afe9;
  outline: none;
  box-shadow: 0 0 8px rgba(102, 175, 233, 0.6);
}

button {
  width: 80%;
  padding: 10px;
  margin-top: 20px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  font-size: 1em;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
