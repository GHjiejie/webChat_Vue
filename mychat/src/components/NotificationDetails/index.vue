<template>
  <div class="notificationDetails">
    <div class="noticeList">
      <div
        class="noticeItem"
        v-for="(request, index) in noticeArr"
        :key="request._id"
      >
        <!-- 用户的基本信息 -->
        <div class="user_avatar">
          <img :src="request.avatar" alt="avatar" class="avatar-img" />
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
                @click="apply(request._id, index)"
                >同意</el-button
              >
              <el-button
                type="danger"
                size="small"
                plain
                @click="refuse(request._id, index)"
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
              @click="apply(request._id, index)"
              >同意</el-button
            >
            <el-button
              type="danger"
              size="small"
              plain
              @click="refuse(request._id, index)"
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
import { defineProps, ref, defineEmits } from "vue";
import { ElMessage } from "element-plus";
import { refuseFriend, agreeFriend } from "@/apis/user";
const currentUserId = localStorage.getItem("userId");
// console.log("currentUserId", currentUserId);
const emits = defineEmits(["applyFriend", "refuseFriend"]);
const props = defineProps({
  noticeArr: Array,
  type: String,
});
// console.log("props", props);
const refuse = async (fromUserId, index) => {
  // console.log("拒绝好友请求", fromUserId);

  const data = {
    fromUserId,
    userId: currentUserId,
  };
  try {
    const res = await refuseFriend(data);
    if (res.data.code === 200) {
      props.noticeArr[index].status = "rejected";
      emits("refuseFriend", props.noticeArr[index]);
      ElMessage.success("已拒绝好友请求");
    }
  } catch (error) {}
};

const apply = async (fromUserId, index) => {
  // console.log("index", index);
  const data = {
    fromUserId,
    userId: currentUserId,
  };
  try {
    const res = await agreeFriend(data);
    if (res.data.code === 200) {
      console.log("同意好友请求", fromUserId);
      props.noticeArr[index].status = "accepted";
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
  padding: 1rem;
  border-radius: 10px;

  .noticeList {
    .noticeItem {
      display: flex;
      align-items: center;
      padding: 1rem;
      margin-bottom: 1rem;
      background-color: #f9f9f9;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease-in-out;
      &:hover {
        transform: translateY(-3px);
      }
      .user_avatar {
        margin-right: 1rem;
        img {
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #007bff;
        }
      }
      .user_info {
        flex: 1;
        .user_username {
          font-size: 1.2rem;
          font-weight: bold;
          color: #333;
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
