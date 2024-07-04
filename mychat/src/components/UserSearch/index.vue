<template>
  <div class="addUser">
    <div class="searchBox">
      <input
        type="search"
        @keyup.enter="handleSearch"
        v-model="searchValue"
        placeholder="输入关键字搜索好友"
      />
    </div>
    <div class="userList">
      <div class="userItem" v-for="user in userList">
        <div class="user_avatar">
          <img :src="user.avatar" alt="avatar" />
        </div>
        <div class="user_info">
          <span class="username">{{ user.username }}</span>
          <span class="user_id">{{ user._id }}</span>
        </div>
        <div class="add_btn">
          <el-button type="primary" size="mini" plain @click="apply(user._id)"
            >添加</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, defineProps } from "vue";

import {
  searchUser,
  applyFriend,
  isFriend,
  isSentFriendRequest,
} from "@/apis/user";
import { ElMessage } from "element-plus";
const props = defineProps({
  username: String,
  avatar: String,
  phone: String,
});
const userList = ref([]);
const searchValue = ref("");
// 搜索好友
const handleSearch = async () => {
  try {
    const res = await searchUser(searchValue.value);
    userList.value = res.data.data;
    searchValue.value = "";
  } catch (error) {}
};
const apply = async (toUserId) => {
  const verifyData = {
    userId: localStorage.getItem("userId"),
    friendId: toUserId,
  };
  const res = await isFriend(verifyData);
  console.log("输出是否是好友", res.data);
  if (res.data.code === 200) {
    ElMessage({
      type: "error",
      message: "你们已经是好友了",
    });
    return;
  } else {
    const data = {
      fromUserId: localStorage.getItem("userId"),
      toUserId,
      username: props.username,
      avatar: props.avatar,
      phone: props.phone,
    };
    // 判断是否已经发送过好友请求
    const isSent = await isSentFriendRequest(verifyData);
    // console.log("输出是否已经发送过好友请求", isSent.data);
    if (isSent.data.code === 200) {
      ElMessage({
        type: "error",
        message: "你已经发送过好友请求了",
      });
      return;
    } else {
      const res = await applyFriend(data);
      if (res.data.code === 200) {
        ElMessage({
          type: "success",
          message: "申请成功",
        });
      } else {
        ElMessage({
          type: "error",
          message: "申请失败",
        });
      }
    }
  }

  // if (res.data.data) {
  //   ElMessage({
  //     type: "error",
  //     message: "你们已经是好友了",
  //   });
  // } else {
  //   const data = {
  //     fromUserId: localStorage.getItem("userId"),
  //     toUserId,
  //     username: props.username,
  //     avatar: props.avatar,
  //     phone: props.phone,
  //   };
  //   const res = await applyFriend(data);
  //   if(res.data.code === 200) {
  //     ElMessage({
  //       type: "success",
  //       message: "申请成功",
  //     });
  //   }else{
  //     ElMessage({
  //       type: "error",
  //       message: "申请失败",
  //     });
  //   }
  // }
};
</script>
<style scoped lang="scss">
.addUser {
  width: 100%;
  height: 60vh;
  background-color: #e8e6e6;
  border-radius: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  .searchBox {
    width: 100%;
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
    input {
      width: 80%;
      height: 5vh;
      border-radius: 1rem;
      border: none;
      outline: none;
      padding: 0 1rem;
      border: 1px solid #ccc;
      transition: all 0.3s ease-in-out;
      font-size: 1.5rem;
      &:hover {
        border: 1px solid rgba(0, 0, 0, 0.522);
      }
      &::placeholder {
        font-size: 0.8rem;
        color: #ccc;
      }
    }
    input[placeholder] {
      font-size: 1rem;
      color: #000000;
    }
  }
  .userList {
    width: 100%;
    // height: 50vh;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
    padding: 0 2rem;
    overflow: auto;
    .userItem {
      width: 100%;
      height: 10vh;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #ccc;
      padding: 2rem 0;

      .user_avatar {
        width: 10vh;
        height: 10vh;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 80%;
          height: 80%;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid deepskyblue;
        }
      }
      .user_info {
        width: 50%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        gap: 0.5rem;
        .username {
          font-size: 1.2rem;
          font-weight: bold;
        }
        .user_id {
          font-size: 0.8rem;
        }
      }
      .add_btn {
        width: 20%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>
