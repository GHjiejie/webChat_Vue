<template>
  <div class="function-menu">
    <div class="user_avatar">
      <img :src="`${currentUserinfo.avatar}`" alt="avatar" />
    </div>
    <div class="operationList">
      <!-- 聊天 -->
      <router-link to="/chat" active-class="active">
        <!-- <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-liaotian"></use>
        </svg> -->
        <svg-icon icon-class="icon-chat"></svg-icon>
      </router-link>

      <!-- 通讯录 -->
      <router-link to="/contacts" active-class="active">
        <!-- <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-tongxunlu1"></use>
        </svg> -->
        <svg-icon icon-class="icon-tongxunlu"></svg-icon>
      </router-link>
      <!-- <svg class="icon" aria-hidden="true" @click="handleAdd">
        <use xlink:href="#icon-biaoqing-xue"></use>
      </svg> -->
      <!-- 通知 -->
      <router-link to="/notice" active-class="active">
        <!-- <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-noticetongzhi"></use>
        </svg> -->
        <svg-icon icon-class="icon-notice"></svg-icon>
      </router-link>
      <!-- 朋友圈 -->
      <router-link to="/friendsupdate" active-class="active">
        <svg-icon icon-class="icon-pengyouquan"></svg-icon>

        <!-- <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-pengyouquan1"></use>
        </svg> -->
      </router-link>
      <!-- 修改用户个人信息 -->
      <svg-icon icon-class="icon-userSetting"></svg-icon>

      <!-- <svg class="icon" aria-hidden="true" @click="userManage">
        <use xlink:href="#icon-a-24yonghuguanli"></use>
      </svg> -->
    </div>
    <el-dialog
      v-model="userManageStatus"
      width="500"
      center
      :show-close="false"
    >
      <UserUpdate
        :userInfo="currentUserinfo"
        @updateSucces="handleUpdateSuccess"
      ></UserUpdate>
    </el-dialog>
  </div>
</template>
<script setup>
import { ref, onBeforeMount, watch } from "vue";
import { getUserInfo } from "@/apis/user";
import UserUpdate from "@/components/UserManage/UserUpdate/index.vue";

const currentUserinfo = ref({});
const userManageStatus = ref(false);

// 用户更新成功后执行的回调
const handleUpdateSuccess = async () => {
  try {
    await getUser();
    userManageStatus.value = false;
  } catch (error) {}
  // userManageStatus.value = false;
};
const userManage = () => {
  userManageStatus.value = true;
};

onBeforeMount(async () => {
  await getUser();
});
const getUser = async () => {
  try {
    const res = await getUserInfo(localStorage.getItem("userId"));
    if (res.data.code === 200) {
      currentUserinfo.value = res.data.data;
    }
  } catch (error) {}
};
watch(currentUserinfo, (newVal) => {
  currentUserinfo.value = newVal;
});
</script>
<style scoped lang="scss">
::-webkit-scrollbar {
  width: 0px;
}
.active {
  .icon {
    width: 1.5rem;
    height: 1.5rem;
    fill: deepskyblue !important;
  }
}

.function-menu {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  background-color: #2e2e2e;

  .user_avatar {
    height: 10vh;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #3e3e3e;

    img {
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 50%;
      object-fit: cover;
      &:hover {
        cursor: pointer;
      }
    }
  }
  .operationList {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    // color: red;
    // background-color: red;
    .icon {
      width: 1.5rem;
      height: 1.5rem;
      fill: #ccc;
      &:hover {
        fill: deepskyblue;
        cursor: pointer;
      }
    }
  }
}
</style>
