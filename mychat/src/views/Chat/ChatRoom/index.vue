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
                alt="senderUser"
              />
              <img v-else :src="receiverUserInfo.avatar" alt="receiverUser" />
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
            <svg
              class="icon"
              aria-hidden="true"
              ref="emojiRef"
              @click="chooseEmoji"
            >
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
        <!-- 文件展示框 -->

        <FileView
          v-if="hasFile"
          :file-info="fileInfo"
          @sendFileSuccess="uploadSuccess"
        ></FileView>

        <div
          class="input_box"
          contenteditable="true"
          @keyup.enter="formatContnet"
          @paste="handlePaste"
          ref="inputRef"
        ></div>
      </div>
    </div>

    <el-popover
      ref="popoverRef"
      :virtual-ref="emojiRef"
      trigger="click"
      virtual-triggering
      placement="top-end"
      effect="light"
      width="30%"
    >
      <Picker :data="emojiIndexTest" set="twitter" @select="showEmoji" />
    </el-popover>
  </div>
</template>
<script setup>
import {
  ref,
  onBeforeMount,
  onMounted,
  watch,
  reactive,
  nextTick,
  unref,
} from "vue";
import { getUserInfo } from "@/apis/user";
import {
  getMessages,
  sendMessage,
  getSelectedConversation,
  handleSendFile,
} from "@/apis/chat";
import { useRoute } from "vue-router";
import { ElMessage } from "element-plus";
// import userInfoView from "@/components/UserInfo/index.vue";
// all emoji sets.
import data from "emoji-mart-vue-fast/data/all.json";
// Import default CSS
import "emoji-mart-vue-fast/css/emoji-mart.css";
import { Picker, EmojiIndex } from "emoji-mart-vue-fast/src";
import socketServer from "@/plugins/socket";
import FileView from "@/components/FileView/index.vue";
// import { getConversationList } from "../../../apis/chat";
const route = useRoute();
const memberList = ref([]);
const senderUserInfo = ref({});
const receiverUserInfo = ref({});
const currentUserId = ref(localStorage.getItem("userId"));
const messageList = ref([]);
const hasFile = ref(false);
// const viewFriendStatus = ref(false);

const inputRef = ref(null);
const contentRef = ref(null);
const emojiRef = ref(null);
const popoverRef = ref(null);

let emojiIndex = new EmojiIndex(data);
let emojiIndexTest = emojiIndex;

const fileInfo = ref({});

const sendContent = reactive({
  senderId: localStorage.getItem("userId"),
  text: "",
  type: "text",
  mediaUrl: "",
  fileType: "",
  fileName: "",
  sentAt: new Date(Date.now()),
});

const initSentContent = () => {
  sendContent.text = "";
  sendContent.type = "text";
  sendContent.mediaUrl = "";
  sendContent.fileType = "";
  sendContent.fileName = "";
  sendContent.sentAt = new Date(Date.now());
};
// 显示表情
const showEmoji = (emoji) => {
  // 将表情添加到输入框
  inputRef.value.innerText += emoji.native;
};
// 选择表情
const chooseEmoji = () => {
  unref(popoverRef).popperRef?.delayHide?.();
};

// 格式化输入框内容
const formatContnet = async (event) => {
  event.preventDefault();
  // 获取输入框内容
  sendContent.text = inputRef.value.innerText.trim();
  if (sendContent.text === "" && !hasFile.value) {
    ElMessage({
      message: "发送内容不能为空",
      type: "warning",
    });
    return;
  } else {
    await send();
    inputRef.value.innerText = "";
    // 将解析的内容清空
  }
};

// 发送消息
const send = async () => {
  const data = {
    conversationId: route.params.roomId,
    content: sendContent,
  };
  console.log("data", data);
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
  const allowedTypes = [
    "application/pdf",
    "text/plain",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/zip",
  ];
  for (let i = 0; i < items.length; i++) {
    if (items[i].kind === "file") {
      const file = items[i].getAsFile();

      // 判断是否是支持的文件类型
      if (allowedTypes.includes(file.type)) {
        fileInfo.value = file;
        sendContent.fileName = file.name;
        hasFile.value = true;
      } else {
        // 文件类型不被允许，可以给用户提示
        ElMessage({
          message: "只支持上传图片、TXT、DOCX、PDF、ZIP格式的文件",
          type: "warning",
        });
      }
    }
  }
};

const uploadSuccess = (data) => {
  // console.log("输出上传成功后返回的数据", data);
  sendContent.mediaUrl = data.data;
  sendContent.fileType = data.type;
  sendContent.type = "file";
  sendContent.text = "";
  // console.log("输出最后的表数据", sendContent);
  // send();
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
      console.log("输出获取的聊天记录", messageList.value);
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

onMounted(() => {
  unref(inputRef).focus();
});

// 通过监听器来监听路由参数的变化,获取roomId,来根据房间号获取聊天记录
watch(route, async (newVal) => {
  socketServer.joinRoom("joinRoom", newVal.params.roomId);
  getCurrentMessage();
});

watch(
  fileInfo,
  (newVal) => {
    fileInfo.value = newVal;
  },
  {
    deep: true,
  }
);
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
            min-width: 5vh;
            max-width: 5vh;
            height: 5vh;

            img {
              width: 100%;
              height: 100%;
              border-radius: 50%;
              object-fit: cover;

              &:hover {
                cursor: pointer;
              }
            }
          }
          .messageContent {
            margin-left: 1rem;
            max-width: calc(100% - 40vh);
            min-height: 5vh;

            .messageText {
              display: flex;
              align-items: center;
              justify-content: center;
              min-height: 5vh;
              // line-height: inherit;
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
        height: 10vh;
        padding: 0.5rem;
        overflow: auto;
        &:focus {
          outline: none;
        }
      }
    }
  }
}
</style>
