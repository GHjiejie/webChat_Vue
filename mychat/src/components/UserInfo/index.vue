<template>
  <div class="userInfo">
    <div class="userBox">
      <div class="content">
        <div class="top">
          <div class="avatar">
            <img :src="userInfo.avatar" alt="avatar" />
          </div>
          <div class="baseInfo">
            <span class="username">{{ userInfo.username }}</span>
            <span class="phone">{{ userInfo.phone }}</span>
          </div>
          <div class="operation">
            <h2>...</h2>
          </div>
        </div>
        <div class="center">
          <div class="remark">小坏蛋</div>
          <div class="permissions">仅聊天</div>
        </div>
        <div class="footer">
          <div class="signature">我是洁</div>
          <div class="source">通过微信号搜索</div>
        </div>
      </div>
      <div class="connectOptions">
        <div class="optionItem">
          <svg class="icon" aria-hidden="true" @click="openAddDialog">
            <use xlink:href="#icon-liaotian"></use>
          </svg>
        </div>
        <div class="optionItem">
          <svg class="icon" aria-hidden="true" @click="openAddDialog">
            <use xlink:href="#icon-Group"></use>
          </svg>
        </div>
        <div class="optionItem">
          <svg class="icon" aria-hidden="true" @click="openAddDialog">
            <use xlink:href="#icon-shipintonghua-tianchong"></use>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onBeforeMount, watch } from "vue";
import { getUserInfo } from "@/apis/user";
import { useRoute } from "vue-router";
const userInfo = ref({});
const route = useRoute();
onBeforeMount(async () => {
  try {
    const res = await getUserInfo(route.params.id);
    userInfo.value = res.data.data;
  } catch (error) {
    console.log("获取用户信息失败", error);
  }
});
watch(route, async () => {
  try {
    const res = await getUserInfo(route.params.id);
    userInfo.value = res.data.data;
  } catch (error) {
    console.log("获取用户信息失败", error);
  }
});
</script>
<style scoped lang="scss">
.userInfo {
  display: flex;
  // justify-content: center;
  // align-items: center;
  min-height: 100vh;

  background-color: #f5f5f5;

  .userBox {
    width: 400px;
    background-color: #fff;
    // border-radius: 10px;
    // box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;

    .content {
      padding: 20px;

      .top {
        display: flex;
        align-items: center;
        margin-bottom: 20px;

        .avatar {
          flex-shrink: 0;
          width: 80px;
          height: 80px;
          border-radius: 50%;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }

        .baseInfo {
          flex-grow: 1;
          margin-left: 20px;

          .username {
            display: block;
            font-size: 20px;
            font-weight: bold;
          }

          .phone {
            display: block;
            font-size: 14px;
            color: #888;
          }
        }

        .operation {
          h2 {
            font-size: 24px;
            color: #888;
          }
        }
      }

      .center {
        .remark {
          font-size: 16px;
          color: #333;
          margin-bottom: 10px;
        }

        .permissions {
          font-size: 14px;
          color: #888;
        }
      }

      .footer {
        margin-top: 20px;

        .signature {
          font-size: 14px;
          color: #333;
          margin-bottom: 10px;
        }

        .source {
          font-size: 14px;
          color: #888;
        }
      }
    }

    .connectOptions {
      display: flex;
      justify-content: space-around;
      padding: 10px;
      background-color: #fafafa;
      border-top: 1px solid #eaeaea;

      .optionItem {
        .icon {
          width: 30px;
          height: 30px;
          fill: #333;
          cursor: pointer;
          transition: fill 0.3s;

          &:hover {
            fill: #007bff;
          }
        }
      }
    }
  }
}
</style>
