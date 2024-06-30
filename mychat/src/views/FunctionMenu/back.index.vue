<template>
  <div class="aside">
    <div class="left">
      <div class="user_avatar">
        <img
          src="../../assets/images/pexels-photo-2531709.webp"
          alt="avatar"
          @click="userManage"
        />
      </div>
      <div class="operationList">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-liaotian"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-tongxunlu1"></use>
        </svg>
        <svg class="icon" aria-hidden="true" @click="handleAdd">
          <use xlink:href="#icon-biaoqing-xue"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-shoucang"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-pengyouquan1"></use>
        </svg>
      </div>
    </div>
    <div class="right">
      <div class="top">
        <div class="convation_search">
          <input
            type="search"
            @keyup.enter="handleSearch"
            v-model="searchValue"
            placeholder="搜索会话"
          />
        </div>
      </div>
      <div class="center">
        <div class="conversationList">
          <div class="conversationItem" v-for="item in 10">
            <div class="conversation_user">
              <img
                src="../../assets/images/pexels-photo-3560044.webp"
                alt="avatar"
              />
            </div>
            <div class="conversation_info">
              <span class="conversation_username">Jack</span>
              <span class="conversation_content">Hello World</span>
            </div>
          </div>
        </div>
      </div>
      <div class="footer"></div>
    </div>

    <!-- <el-dialog v-model="showAddDialog" width="500" center :show-close="false">
      <UserAdd></UserAdd>
    </el-dialog> -->
  </div>
</template>
<script setup>
import { ref, onMounted, onBeforeMount } from "vue";
import { getUserInfo } from "@/apis/user";
// import UserAdd from "@/components/UserSearch/index.vue";
// import user_info from "@/components/UserInfo/index.vue";
const messageList = ref([]);
const showAddDialog = ref(false);

const userManage = () => {
  // showUserInfoDialog.value = true;
  console.log("User Manage");
};

const handleAdd = () => {
  showAddDialog.value = true;
};

onBeforeMount(async () => {
  const res = await getUserInfo(localStorage.getItem("userId"));
  console.log(res);
});
onMounted(() => {
  // 根据ID获取当前用户的相关信息
});
</script>
<style scoped lang="scss">
::-webkit-scrollbar {
  width: 0px;
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

.aside {
  display: flex;
  .left {
    width: 15%;
    background-color: #2e2e2e;
    display: flex;
    flex-direction: column;
    .user_avatar {
      height: 10vh;
      display: flex;
      align-items: center;
      justify-content: center;
      border-bottom: 1px solid #3e3e3e;
      // background-color: red;
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
  .right {
    flex: 1;
    height: 100vh;
    overflow: auto;
    .top {
      position: sticky;
      top: 0;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      height: 10vh;
      background-color: #e8e6e6;
      border-bottom: 1px solid #ccc;
      // box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);

      .convation_search {
        // width: 20%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        input {
          width: 80%;
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
      }
      // overflow: hidden;

      .user_info {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        color: #ccc;
        font-weight: bold;
        gap: 0.5rem;
        margin-left: 1rem;
        .username {
          font-size: 20px;
        }
        .user_id {
          font-size: 14px;
        }
      }
      .user_add {
        height: 100%;
        display: flex;
        align-items: center;
        padding: 5px;

        h1 {
          font-size: 2.5rem;
          color: #ccc;
          font-weight: bold;
          &:hover {
            color: skyblue;
            cursor: pointer;
          }
        }
      }
    }
    .center {
      flex: 1;
      overflow: auto;

      .conversationList {
        display: flex;
        flex-direction: column;
        background-color: #e8e6e6;

        .conversationItem {
          height: 4rem;
          border-bottom: 1px solid #f5f5f5;
          transition: all 0.3s;
          padding: 2.5rem 0.5rem;
          display: flex;
          align-items: center;

          .conversation_user {
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
          .conversation_info {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            gap: 0.5rem;
            margin-left: 1rem;
            .conversation_username {
              font-size: 16px;
            }
            .conversation_content {
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
    .footer {
      height: 60px;
    }
  }
}

.user {
  display: flex;
  align-items: center;
  img {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    object-fit: cover;
  }
  .user_info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.5rem;
    margin-left: 1rem;
    .username {
      font-size: 20px;
    }
    .user_id {
      font-size: 14px;
    }
  }
}
</style>
