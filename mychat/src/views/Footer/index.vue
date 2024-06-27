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
      <div class="input_box">
        <el-input
          placeholder="请输入内容"
          v-model="message"
          @keyup.enter="sendMessage"
        ></el-input>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
const message = ref("");
const sendMessage = () => {
  console.log(message.value);
  message.value = "";
};
</script>
<style scoped lang="scss">
.footer {
  height: 20rem;
  background-color: rgb(255, 255, 255);
  .send_box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    // padding: 0 1rem;
    .tools {
      width: 100%;
      height: 3rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #f0f0f0;
      padding: 0 1rem;
      svg {
        width: 1.5rem;
        height: 1.5rem;
        margin-right: 1rem;
        &:hover {
          cursor: pointer;
        }
      }

      .el-button {
        margin-right: 1rem;
      }
    }
    .input_box {
      flex: 1;
      .el-input {
        width: 100%;
      }
    }
  }
}
</style>
