<template>
  <div class="main">
    <div class="left">
      <FunctionMenu></FunctionMenu>
    </div>
    <div class="right">
      <Header></Header>
      <ChatBox></ChatBox>
      <Footer></Footer>
    </div>
  </div>
</template>

<script setup>
import FunctionMenu from "./FunctionMenu/index.vue";
import Footer from "./Footer/index.vue";
import Header from "./Header/index.vue";
import ChatBox from "./Center/index.vue";
</script>

<style scoped lang="scss">
.main {
  display: flex;
  ::-webkit-scrollbar {
    width: 0px;
  }
  .left {
    width: 30%;
    background-color: #f0f0f0;
  }
  .right {
    width: 70%;
    display: flex;
    flex-direction: column;
  }
}
</style>
