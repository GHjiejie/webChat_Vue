<template>
  <div class="chatRoom">
    <div class="header">
      <div class="chat-user">
        <span>{{ currentUserinfo.username }}</span>
      </div>
    </div>
    <div class="content">
      <h1>主要聊天内容</h1>
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
          @keyup.enter="sendMessage"
          @paste="handlePaste"
          ref="inputBox"
        ></div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onBeforeMount, watch } from "vue";
import { getUserInfo } from "@/apis/user";
import { useRoute } from "vue-router";
const router = useRoute();
const currentUserinfo = ref({});
const inputBox = ref(null);
const sendMessage = () => {
  const message = inputBox.value.innerText;
  console.log("Message:", message);
  inputBox.value.innerText = "";
};
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

onBeforeMount(async () => {
  try {
    const res = await getUserInfo(localStorage.getItem("userId"));
    if (res.data.code === 200) {
      currentUserinfo.value = res.data.data;
    }
  } catch (error) {}
});
// 通过监听器来监听路由参数的变化,获取roomId,来根据房间号获取聊天记录
watch(router, () => {
  console.log(router.params);
});
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
        font-size: 2rem;
        margin-left: 1rem;
        font-weight: bold;
      }
    }
  }
  .content {
    height: 70vh;
    overflow: auto;
    background-color: #f5f5f5;
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
