<template>
  <div class="contacts">
    <div class="contacts-left">
      <div class="top">
        <div class="convation_search">
          <input
            type="search"
            @keyup.enter="handleSearch"
            v-model="searchValue"
            placeholder="搜索好友"
          />
          <div class="friendAdd">
            <svg class="icon" aria-hidden="true" @click="openAddDialog">
              <use xlink:href="#icon-tianjiahaoyou1"></use>
            </svg>
          </div>
        </div>
      </div>
      <div class="center">
        <div class="friendList">
          <router-link
            :to="`/contacts/${friend._id}`"
            class="friendItem"
            active-class="active"
            v-for="friend in friendList"
            @click="viewFriend(friend)"
          >
            <div class="friend_user">
              <img :src="`${friend.avatar}`" alt="avatar" />
            </div>
            <div class="friend_info">
              <span class="friend_username">{{ friend.username }}</span>
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <div class="contacts-right">
      <router-view></router-view>
    </div>
    <el-dialog v-model="showAddDialog" width="500" center :show-close="false">
      <UserAdd
        :username="currentUserinfo.username"
        :avatar="currentUserinfo.avatar"
        :phone="currentUserinfo.phone"
      ></UserAdd>
    </el-dialog>
  </div>
</template>
<script setup>
import { ref, onBeforeMount, watch } from "vue";
import UserAdd from "@/components/UserSearch/index.vue";

import { getUserInfo } from "@/apis/user";
const currentUserinfo = ref({});
const showAddDialog = ref(false);
const friendList = ref([]);
const friendListId = ref([]);
// const viewFriend = (frienndId) => {
//   // console.log("查看好友", frienndId);
// };

onBeforeMount(async () => {
  // const res = await getUserInfo(localStorage.getItem("userId"));
  try {
    const res = await getUserInfo(localStorage.getItem("userId"));
    if (res.data.code === 200) {
      currentUserinfo.value = res.data.data;
      friendListId.value = res.data.data.friends;
      // console.log("输出当前用户", currentUserinfo.value);
      // console.log("friendList", friendList.value);
    }
  } catch (error) {}
});

const openAddDialog = () => {
  showAddDialog.value = true;
};
watch(friendListId, async (newVal) => {
  // console.log("newVal", newVal);
  for (let i = 0; i < newVal.length; i++) {
    const res = await getUserInfo(newVal[i]);
    friendList.value.push(res.data.data);
  }
  // console.log("friendList", friendList.value);
});
</script>
<style scoped lang="scss">
.active {
  background-color: #c7c6c6 !important;
}
a {
  text-decoration: none;
}
:deep(.el-dialog) {
  border-radius: 1rem;
  background-color: transparent;
  box-shadow: none;
  padding: 0;
  .el-dialog__header {
    display: none;
  }
}
.contacts {
  display: flex;
  .contacts-left {
    width: 20%;
    height: 100vh;
    overflow: auto;
    border-right: 1px solid #ccc;
    .top {
      display: flex;
      height: 10vh;
      border-bottom: 1px solid #ccc;
      position: sticky;
      top: 0;
      background-color: #f5f5f5;

      .convation_search {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding-left: 1rem;
        input {
          width: 60%;
          // background-color: red;
          height: 5vh;
          border-radius: 1rem;
          border: none;
          outline: none;
          padding: 0 1rem;
          border: 1px solid #ccc;
          transition: all 0.3s ease-in-out;
          font-size: 1rem;
          &:hover {
            border: 1px solid rgba(0, 0, 0, 0.522);
          }
          &::placeholder {
            color: #ccc;
            font-size: 0.8rem;
            font-weight: bold;
          }
        }
        .friendAdd {
          margin-left: 1rem;
          width: 20%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          .el-button {
            font-size: 1.5rem;
            width: 100%;
            height: 5vh;
            border-radius: 1rem;
            font-size: 1rem;
          }
        }
      }
    }
    .center {
      flex: 1;
      overflow: auto;

      .friendList {
        display: flex;
        flex-direction: column;
        background-color: #e8e6e6;

        .friendItem {
          height: 4rem;
          border-bottom: 1px solid #f5f5f5;
          transition: all 0.3s;
          padding: 2.5rem 0.5rem;
          display: flex;
          align-items: center;

          .friend_user {
            height: 100%;
            display: flex;
            align-items: center;
            img {
              width: 2.5rem;
              height: 2.5rem;
              border-radius: 50%;
              object-fit: cover;
            }
          }
          .friend_info {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            gap: 0.5rem;
            margin-left: 1rem;
            .friend_username {
              font-size: 0.9rem;
              font-weight: bold;
              color: black;
            }
            .friend_id {
              font-size: 14px;
            }
          }
          &:hover {
            background-color: #c5c5c5;
            cursor: pointer;
          }
        }
      }
    }
  }
  .contacts-right {
    width: 80%;
    height: 100vh;
  }
}
</style>
