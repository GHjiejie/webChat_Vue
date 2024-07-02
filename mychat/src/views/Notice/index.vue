<template>
  <div class="notice">
    <el-tabs type="border-card">
      <el-tab-pane label="所有">
        <template v-if="friendRequests.length === 0">
          <h1>没有收到好友请求哦</h1>
        </template>
        <template v-else>
          <noticeDetails
            :noticeArr="friendRequests"
            type="all"
            @applyFriend="apply"
            @refuseFriend="refuse"
          ></noticeDetails>
        </template>
      </el-tab-pane>
      <el-tab-pane label="已发送">
        <template v-if="sentFriendRequests.length === 0">
          <h1>没有发送好友请求哦</h1>
        </template>
        <template v-else>
          <noticeDetails
            :noticeArr="sentFriendRequests"
            type="sent"
          ></noticeDetails>
        </template>
      </el-tab-pane>
      <el-tab-pane label="待处理">
        <template v-if="pendingArr.length === 0">
          <h1>没有待处理的好友请求哦</h1>
        </template>
        <template v-else>
          <noticeDetails
            :noticeArr="pendingArr"
            type="pending"
            @applyFriend="apply"
            @refuseFriend="refuse"
          ></noticeDetails>
        </template>
      </el-tab-pane>
      <el-tab-pane label="已同意">
        <template v-if="acceptedArr.length === 0">
          <h1>你还没有同意任何好友的申请哦</h1>
        </template>
        <template v-else>
          <noticeDetails
            :noticeArr="acceptedArr"
            type="accepted"
          ></noticeDetails>
        </template>
      </el-tab-pane>
      <el-tab-pane label="已拒绝">
        <template v-if="rejectedArr.length === 0">
          <h1>你的信用很高哦，你还没有拒绝任何人哈！！！</h1>
        </template>
        <template v-else>
          <noticeDetails
            :noticeArr="rejectedArr"
            type="rejected"
          ></noticeDetails>
        </template>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script setup>
import { ref, onBeforeMount, watch } from "vue";
import { getUserInfo, agreeFriend, refuseFriend } from "@/apis/user";
import noticeDetails from "@/components/NotificationDetails/index.vue";
const currentUser = ref({});
// 收到的好友请求
const originFriendRequests = ref([]);
const friendRequests = ref([]);
// 已发送的好友请求
const originSentFriendRequests = ref([]);
const sentFriendRequests = ref([]);

const pendingArr = ref([]);
const acceptedArr = ref([]);
const rejectedArr = ref([]);

const refuse = (data) => {
  // console.log("输出拒绝的数组", data);
  rejectedArr.value.push(data);
};
const apply = (data) => {
  acceptedArr.value.push(data);
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
        // 根据status的不同，分别放入不同的数组
        if (originFriendRequests.value[i].status === "pending") {
          pendingArr.value.push({
            ...fromUserInfo.data.data,
            status: originFriendRequests.value[i].status,
          });
        } else if (originFriendRequests.value[i].status === "accepted") {
          acceptedArr.value.push({
            ...fromUserInfo.data.data,
            status: originFriendRequests.value[i].status,
          });
        } else {
          rejectedArr.value.push({
            ...fromUserInfo.data.data,
            status: originFriendRequests.value[i].status,
          });
        }
      }
      console.log("输出最后的friendRequests", friendRequests.value);
      console.log("输出最后的pendingArr", pendingArr.value);
      console.log("输出最后的acceptedArr", acceptedArr.value);
      console.log("输出最后的rejectedArr", rejectedArr.value);
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
        sentFriendRequests.value.push({
          ...toUserInfo.data.data,
          status: originSentFriendRequests.value[i].status,
        });
      }
      console.log("输出最后的sentFriendRequests", sentFriendRequests.value);
    }
  },
  { deep: true }
);
watch(
  friendRequests,
  async (newVal) => {
    // 根据最新的friendRequests数组，更新pendingArr、acceptedArr、rejectedArr
    pendingArr.value = [];
    acceptedArr.value = [];
    rejectedArr.value = [];
    for (let i = 0; i < friendRequests.value.length; i++) {
      if (friendRequests.value[i].status === "pending") {
        pendingArr.value.push(friendRequests.value[i]);
      } else if (friendRequests.value[i].status === "accepted") {
        acceptedArr.value.push(friendRequests.value[i]);
      } else {
        rejectedArr.value.push(friendRequests.value[i]);
      }
    }
  },
  { deep: true }
);
</script>
<style lang="scss" scoped>
.notice {
}
</style>
