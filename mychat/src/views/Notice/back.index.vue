<template>
  <div class="notice">
    <el-tabs type="border-card">
      <el-tab-pane label="所有"></el-tab-pane>
      <el-tab-pane label="好友申请">
        <div class="friendRequest">
          <template v-if="friendRequests.length === 0">
            <h1>没有收到好友请求哦</h1>
          </template>
          <template v-else>
            <div class="friendRequestItem" v-for="request in friendRequests">
              <div class="friendRequest_user">
                <img
                  src="../../assets/images/pexels-photo-3560044.webp"
                  alt="avatar"
                />
              </div>
              <div class="friendRequest_info">
                <span class="friendRequest_username">{{
                  request.username
                }}</span>
                <span class="friendRequest_content"
                  >久闻大名，加个好友吗？</span
                >
                <el-button
                  type="primary"
                  size="mini"
                  @click="apply(request._id)"
                  >同意</el-button
                >
                <el-button
                  type="danger"
                  size="mini"
                  @click="refuse(request._id)"
                  >拒绝</el-button
                >
              </div>
            </div>
          </template>
        </div>
      </el-tab-pane>
      <el-tab-pane label="已发送">
        <template v-if="sentFriendRequests.length === 0">
          <h1>没有发送好友请求哦</h1>
        </template>
        <template v-else>
          <div
            class="sentFriendRequestItem"
            v-for="request in sentFriendRequests"
          >
            <div class="sentFriendRequest_user">
              <img
                src="../../assets/images/pexels-photo-3560044.webp"
                alt="avatar"
              />
            </div>
            <div class="sentFriendRequest_info">
              <span class="sentFriendRequest_username">{{
                request.username
              }}</span>
              <span class="sentFriendRequest_content">
                老老实实加我为好友，不要拒绝哦
              </span>
            </div>
          </div>
        </template>
      </el-tab-pane>
      <el-tab-pane label="待处理">Config</el-tab-pane>
      <el-tab-pane label="已同意">Role</el-tab-pane>
      <el-tab-pane label="已拒绝">Role</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script setup>
import { ref, onBeforeMount, watch } from "vue";
import { getUserInfo, agreeFriend, refuseFriend } from "@/apis/user";
const currentUser = ref({});
// 收到的好友请求
const originFriendRequests = ref([]);
const friendRequests = ref([]);
// 已发送的好友请求
const originSentFriendRequests = ref([]);
const sentFriendRequests = ref([]);
const refuse = async (fromUserId) => {
  console.log("拒绝好友请求");
  const data = {
    fromUserId,
    userId: currentUser.value._id,
  };
  const res = await refuseFriend(data);
  console.log("输出拒绝好友请求的结果", res);
};

const apply = async (fromUserId) => {
  // console.log("同意好友请求", fromUserId);
  const data = {
    fromUserId,
    userId: currentUser.value._id,
  };
  const res = await agreeFriend(data);
  // console.log("输出好友添加的结果", res);
};

onBeforeMount(async () => {
  const res = await getUserInfo(localStorage.getItem("userId"));
  currentUser.value = res.data.data;
  originFriendRequests.value = res.data.data.friendRequests;
  originSentFriendRequests.value = res.data.data.sentFriendRequests;
});
watch(
  originFriendRequests,
  async () => {
    if (originFriendRequests.value.length > 0) {
      for (let i = 0; i < originFriendRequests.value.length; i++) {
        const fromUserInfo = await getUserInfo(
          originFriendRequests.value[i].userId
        );
        friendRequests.value.push({
          ...fromUserInfo.data.data,
          status: originFriendRequests.value[i].status,
        });
      }
      console.log("输出最后的friendRequests", friendRequests.value);
    }
  },
  { deep: true }
);
watch(
  originSentFriendRequests,
  async (newVal) => {
    if (originSentFriendRequests.value.length > 0) {
      for (let i = 0; i < originSentFriendRequests.value.length; i++) {
        const toUserInfo = await getUserInfo(
          originSentFriendRequests.value[i].userId
        );
        sentFriendRequests.value.push(toUserInfo.data.data);
      }
      console.log("输出最后的sentFriendRequests", sentFriendRequests.value);
    }
  },
  { deep: true }
);
</script>
<style lang="scss" scoped>
.notice {
  .friendRequest {
    .friendRequestItem {
      display: flex;
      .friendRequest_user {
        width: 20%;
        img {
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }
      }
      .friendRequest_info {
        width: 80%;
        .friendRequest_username {
          font-size: 20px;
        }
        .friendRequest_content {
          font-size: 16px;
        }
      }
    }
  }
  .sentFriendRequestItem {
    display: flex;
    .sentFriendRequest_user {
      width: 20%;
      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
    }
    .sentFriendRequest_info {
      width: 80%;
      .sentFriendRequest_username {
        font-size: 20px;
      }
      .sentFriendRequest_content {
        font-size: 16px;
      }
    }
  }
}
</style>
