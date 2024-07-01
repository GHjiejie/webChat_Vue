<template>
  <div class="chatbox">
    <div class="box-left">
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
          <router-link
            :to="`/chat/${conversation._id}`"
            class="conversationItem"
            v-for="conversation in conversationList"
          >
            <template v-if="conversation.type === 'private'">
              <div class="conversation_user">
                <img :src="conversation.friend.avatar" alt="avatar" />
              </div>
              <div class="conversation_info">
                <span class="conversation_username">{{
                  conversation.friend.username
                }}</span>
                <!-- <span class="conversation_content">Hello World</span> -->
              </div>
            </template>
          </router-link>
        </div>
      </div>
      <div class="footer"></div>
    </div>
    <div class="box-right">
      <router-view></router-view>
    </div>
  </div>
</template>
<script setup>
import { ref, onBeforeMount, watch } from "vue";
import { useRoute } from "vue-router";
import { getUserInfo } from "@/apis/user";
import { getConversationList } from "@/apis/chat";
// import { createPrivateRoom, verifyPrivateRoom } from "@/apis/chat";
const conversationList = ref([]);
const currentUserId = ref(localStorage.getItem("userId"));
onBeforeMount(async () => {
  await getAllConversation();
});

const getAllConversation = async () => {
  const params = {
    userId: currentUserId.value,
  };
  try {
    const res = await getConversationList(params);
    if (res.data.code === 200) {
      conversationList.value = res.data.data;
    }
  } catch (error) {}
};
// watch(privateFriendIdArr, async () => {
//   console.log("好友ID数组发生变化");
//   for (let i = 0; i < privateFriendIdArr.value.length; i++) {
//     const res = await getUserInfo(privateFriendIdArr.value[i]);
//     if (res.data.code === 200) {
//       privateFriendArr.value.push(res.data.data);
//     }
//   }
//   console.log("输出好友数组", privateFriendArr.value);
// });
</script>
<style scoped lang="scss">
.chatbox {
  display: flex;
  // background-color: red;
  .box-left {
    width: 20%;
    height: 100vh;
    overflow: auto;
    border-right: 1px solid #ccc;
    .top {
      height: 10%;
      height: 10vh;
      border-bottom: 1px solid #ccc;
      position: sticky;
      top: 0;
      background-color: #f5f5f5;

      .convation_search {
        // width: 20%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding-left: 1rem;
        input {
          width: 60%;
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
      height: 10%;
    }
  }
  .box-right {
    width: 80%;
  }
}
</style>
