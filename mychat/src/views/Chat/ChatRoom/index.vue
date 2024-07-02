<template>
  <div class="chatRoom">
    <div class="header">
      <div class="chat-user">
        <span>GXNU-SOFTWORE-409</span>
      </div>
    </div>
    <div class="content" ref="contentRef">
      <div class="messageList">
        <div
          class="messageItem"
          v-for="message in messageList"
          :key="message._id"
        >
          <div
            class="chatMessageBox"
            :class="
              message.content.senderId === currentUserId
                ? 'senderRight'
                : 'reciverLeft'
            "
          >
            <div class="avatar">
              <img
                v-if="message.content.senderId === senderUserInfo._id"
                :src="senderUserInfo.avatar"
                alt=""
              />
              <img v-else :src="receiverUserInfo.avatar" alt="" />
            </div>
            <div class="messageContent">
              <div class="messageText">{{ message.content.text }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="send_box">
        <!-- 聊天工具栏 -->
        <div class="tools">
          <div class="left">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-biaoqing1"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-wj-wjj"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-caijian1"></use>
            </svg>
          </div>
          <div class="right">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-dianhua"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-shipintonghua-tianchong"></use>
            </svg>
          </div>
        </div>
        <!-- 聊天输入框 -->
        <div
          class="input_box"
          contenteditable="true"
          @keyup.enter="formatContnet"
          @paste="handlePaste"
          ref="inputBox"
        ></div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onBeforeMount, watch, reactive, nextTick } from "vue";
import { getUserInfo } from "@/apis/user";
import { getMessages, sendMessage, getSelectedConversation } from "@/apis/chat";
import { useRoute } from "vue-router";
import { ElMessage } from "element-plus";
// import io from "socket.io-client";
// const socket = io("http://localhost:3000");
import socketServer from "@/plugins/socket";
import { getConversationList } from "../../../apis/chat";
const route = useRoute();
const memberList = ref([]);
const senderUserInfo = ref({});
const receiverUserInfo = ref({});
const currentUserId = ref(localStorage.getItem("userId"));
const messageList = ref([]);
const inputBox = ref(null);
const contentRef = ref(null);
const sendContent = reactive({
  senderId: localStorage.getItem("userId"),
  text: "",
  type: "text",
  mediaUrl: "",
  fileName: "",
  sentAt: new Date(Date.now()),
});
// 格式化输入框内容
const formatContnet = async (event) => {
  event.preventDefault();
  // 获取输入框内容
  sendContent.text = inputBox.value.innerText.trim();
  if (sendContent.text === "") {
    ElMessage({
      message: "发送内容不能为空",
      type: "warning",
    });
    return;
  } else {
    await send();
    inputBox.value.innerText = "";
  }
};

// 发送消息
const send = async () => {
  const data = {
    conversationId: route.params.roomId,
    content: sendContent,
  };
  try {
    const res = await sendMessage(data);
    if (res.data.code === 200) {
      // 将消息发送到指定房间
      socketServer.sendPrivateMessage("privateChat", res.data.data);
    }
  } catch (error) {}
};

// 监听服务器返回的数据
socketServer.on("chatRes", (data) => {
  messageList.value.push(data);
});
// 处理粘贴事件
const handlePaste = (e) => {
  const items = e.clipboardData.items;
  for (let i = 0; i < items.length; i++) {
    if (items[i].kind === "file") {
      const file = items[i].getAsFile();
      console.log("Pasted file:", file);
      // Here you can handle the file (e.g., upload it, display it, etc.)
    }
  }
};

// 获取当前会话的聊天记录
const getCurrentMessage = async () => {
  const params = {
    conversationId: route.params.roomId,
  };
  try {
    const res = await getMessages(params);
    if (res.data.code === 200) {
      messageList.value = res.data.data;
      // console.log("输出获取的聊天记录", messageList.value);
    }
  } catch (error) {}
};

// 获取当前会话的成员（暂时不支持群聊）
const getConversationMembers = async () => {
  const params = {
    conversationId: route.params.roomId,
  };
  try {
    const res = await getSelectedConversation(params);
    if (res.data.code === 200) {
      memberList.value = res.data.data.members;
    }
  } catch (error) {}
};

const getUser = async (userId) => {
  try {
    const res = await getUserInfo(userId);
    if (res.data.code === 200) {
      return res.data.data;
    }
  } catch (error) {}
};

onBeforeMount(async () => {
  try {
    socketServer.joinRoom("joinRoom", route.params.roomId);
    await getCurrentMessage();
    await getConversationMembers();
  } catch (error) {}
});

// 通过监听器来监听路由参数的变化,获取roomId,来根据房间号获取聊天记录
watch(route, async (newVal) => {
  socketServer.joinRoom("joinRoom", newVal.params.roomId);
  getCurrentMessage();
});

watch(
  memberList,
  () => {
    // console.log("memberList", memberList.value);
    memberList.value.forEach(async (item) => {
      if (item !== currentUserId.value) {
        senderUserInfo.value = await getUser(item);
      } else {
        receiverUserInfo.value = await getUser(item);
      }
    });
  },
  { deep: true }
);
watch(
  messageList,
  (newVal) => {
    // 确保在数组长度更新后在滚动到底部
    nextTick(() => {
      contentRef.value.scrollTop = contentRef.value.scrollHeight;
    });
    // contentRef.value.scrollTop = contentRef.value.scrollHeight;
  },
  { deep: true }
);
</script>
<style scoped lang="scss">
.chatRoom {
  height: 100vh;
  box-sizing: border-box;
  .header {
    height: 10vh;
    background-color: #f0f0f0;
    border-bottom: 1px solid #ccc;
    .chat-user {
      display: flex;
      height: inherit;
      justify-content: flex-start;
      align-items: center;
      span {
        font-size: 1.5rem;
        margin-left: 1rem;
        font-weight: bold;
      }
    }
  }
  .content {
    height: 70vh;
    overflow: auto;
    background-color: #f5f5f5;
    .messageList {
      display: flex;
      flex-direction: column;
      align-items: center;
      // justify-content: flex-start;
      .messageItem {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: stretch;

        .chatMessageBox {
          display: flex;
          align-items: flex-start;
          justify-content: flex-start;
          margin: 1rem 0;
          padding: 0 2rem;
          .avatar {
            width: 5vh;
            min-width: 5vh;
            max-width: 5vh;
            height: 5vh;

            img {
              width: 100%;
              height: 100%;
              border-radius: 50%;
              object-fit: cover;
            }
          }
          .messageContent {
            margin-left: 1rem;
            max-width: calc(100% - 40vh);
            .messageText {
              padding: 0.5rem;
              border-radius: 1rem;
              background-color: #fff;
              // box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
          }
        }
        .senderRight {
          flex-direction: row-reverse;

          .messageContent {
            margin-right: 1rem;
            .messageText {
              background-color: #95ec69;
            }
          }
        }
      }
    }
  }
  .footer {
    height: 20vh;
    overflow: auto;
    background-color: #f5f5f5;
    border-top: 1px solid #ccc;

    .send_box {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;

      .tools {
        width: 100%;
        height: 5vh;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1rem;

        svg {
          width: 1.2rem;
          height: 1.2rem;
          margin-right: 1rem;
          &:hover {
            cursor: pointer;
          }
        }
      }
      .input_box {
        width: 100%;
        height: 15vh;
        padding: 0 0.5rem;
        overflow: auto;
        &:focus {
          outline: none;
        }
      }
    }
  }
}
</style>
