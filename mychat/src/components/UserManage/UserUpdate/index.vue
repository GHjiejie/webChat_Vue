<template>
  <div class="userUpdate">
    <el-form :model="userInfo" label-width="80px">
      <el-form-item label="用户名">
        <el-input
          v-model="updateForm.username"
          :placeholder="userInfo.username"
        ></el-input>
      </el-form-item>
      <el-form-item label="头像">
        <el-avatar
          :src="currentUserAvatar"
          @click="changeAvatar"
          size="large"
          shape="square"
        ></el-avatar>
        <input
          style="display: none"
          type="file"
          accept="image/*"
          @change="photoChange"
          ref="inputRef"
        />
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="updateForm.phone" :placeholder="userInfo.phone" />
      </el-form-item>
    </el-form>
    <el-button type="primary" @click="submitUpdate">修改</el-button>
    <el-button @click="userManageStatus = false">取消</el-button>
  </div>
</template>
<script setup>
import { ref, defineProps, reactive, defineEmits, watch } from "vue";
import { updateUserInfo } from "@/apis/user";
import { ElMessage } from "element-plus";
const inputRef = ref(null);
const props = defineProps({
  userInfo: Object,
});
const emit = defineEmits(["updateSucces"]);
const currentUserAvatar = ref(props.userInfo.avatar);
const updateForm = reactive({
  userId: props.userInfo._id,
  username: "",
  phone: "",
});
const changeAvatar = () => {
  inputRef.value.click();
};
// 监听输入框的变化
const photoChange = (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = (e) => {
    currentUserAvatar.value = e.target.result;
  };
};
const submitUpdate = async () => {
  const data = {
    ...updateForm,
    newAvatar: inputRef.value.files[0],
  };
  try {
    await updateUserInfo(data);
    ElMessage.success("修改成功");
    emit("updateSucces");
  } catch (error) {
    ElMessage.error("修改失败");
  }
};
</script>
<style lang="scss" scoped></style>
