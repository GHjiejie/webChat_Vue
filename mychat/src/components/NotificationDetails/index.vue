<template>
  <div class="notificationDetails">
    <div class="noticeList">
      <div class="noticeItem" v-for="request in noticeArr">
        <!-- 用户的基本信息 -->
        <div class="user_avatar">
          <img
            :src="request.avatar"
            alt="avatar"
            style="width: 2.5rem; height: 2.5rem"
          />
        </div>
        <div class="user_info">
          <span class="user_username">{{ request.username }}</span>
          <template v-if="type === 'sent'">
            <span class="user_content">我是秋名山车神</span>
          </template>
          <span v-else class="user_content">久闻大名，加个好友吗？</span>
        </div>
        <!-- 用户操作 -->
        <template v-if="type === 'all'">
          <template v-if="request.status === 'pending'">
            <div class="user_operation">
              <el-button
                type="primary"
                size="small"
                plain
                @click="apply(request._id)"
                >同意</el-button
              >
              <el-button
                type="danger"
                size="small"
                plain
                @click="refuse(request._id)"
                >拒绝</el-button
              >
            </div>
          </template>

          <template v-if="request.status === 'accepted'">
            <div class="user_operation">
              <el-button type="primary" size="small" plain disabled
                >已同意</el-button
              >
            </div>
          </template>

          <template v-if="request.status === 'rejected'">
            <div class="user_operation">
              <el-button type="danger" size="small" plain disabled
                >已拒绝</el-button
              >
            </div>
          </template>
        </template>
        <template v-if="type === 'sent'">
          <template v-if="request.status === 'accepted'">
            <div class="user_operation">
              <el-button type="primary" size="small" plain disabled
                >对方同意</el-button
              >
            </div>
          </template>
          <template v-if="request.status === 'rejected'">
            <div class="user_operation">
              <el-button type="danger" size="small" plain disabled
                >对方拒绝</el-button
              >
            </div>
          </template>

          <template v-if="request.status === 'pending'">
            <div class="user_operation">
              <el-button type="warning" size="small" plain disabled
                >待验证</el-button
              >
            </div>
          </template>
        </template>
        <template v-if="type === 'accepted'">
          <div class="user_operation">
            <el-button type="primary" size="small" plain disabled
              >已同意</el-button
            >
          </div>
        </template>
        <template v-if="type === 'pending'">
          <div class="user_operation">
            <el-button
              type="primary"
              size="small"
              plain
              @click="apply(request._id)"
              >同意</el-button
            >
            <el-button
              type="danger"
              size="small"
              plain
              @click="refuse(request._id)"
              >拒绝</el-button
            >
          </div>
        </template>
        <template v-if="type === 'rejected'">
          <div class="user_operation">
            <el-button type="danger" size="small" plain disabled
              >已拒绝</el-button
            >
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script setup>
import { defineProps, ref } from "vue";
import { ElMessage } from "element-plus";
import { refuseFriend, agreeFriend } from "@/apis/user";
const currentUserId = localStorage.getItem("userId");
console.log("currentUserId", currentUserId);
const props = defineProps({
  noticeArr: Array,
  type: String,
});
console.log("props", props);
const refuse = async (fromUserId) => {
  const data = {
    fromUserId,
    userId: currentUserId,
  };
  try {
    const res = await refuseFriend(data);
    if (res.data.code === 200) {
      ElMessage.success("已拒绝好友请求");
    }
  } catch (error) {}
};

const apply = async (fromUserId) => {
  console.log("同意好友请求", fromUserId);
  const data = {
    fromUserId,
    userId: currentUserId,
  };
  try {
    const res = await agreeFriend(data);
    if (res.data.code === 200) {
      ElMessage.success("已同意好友请求");
    }
  } catch (error) {}
};
console.log("props", props);
</script>
<style scoped lang="scss">
.notificationDetails {
  width: 60%;
  background-color: #ffffff;
  .noticeList {
    .noticeItem {
      display: flex;
      align-items: center;
      padding: 0.5rem;
      border-bottom: 1px solid #f0f0f0;
      .user_avatar {
        margin-right: 1rem;
      }
      .user_info {
        flex: 1;
        .user_username {
          font-size: 1.2rem;
          font-weight: bold;
        }
        .user_content {
          font-size: 1rem;
          color: #666;
        }
      }
      .user_operation {
        display: flex;
        align-items: center;
        .el-button {
          margin-right: 0.5rem;
        }
      }
    }
  }
}
</style>
