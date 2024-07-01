<template>
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
</template>
<script setup>
import { reactive, ref } from "vue";
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
</script>
<style scoped lang="scss">
.footer {
  height: 20vh;
  background-color: #f5f5f5;

  .send_box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    // padding: 0 1rem;
    .tools {
      width: 100%;
      height: 5vh;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #f5f5f5;
      padding: 0 1rem;

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
      padding: 0.5rem;
      overflow: auto;
      &:focus {
        outline: none;
      }
    }
  }
}
</style>
