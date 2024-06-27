<template>
  <div class="main">
    <div class="left">
      <Aside></Aside>
    </div>
    <div class="right">
      <Header></Header>
      <ChatBox></ChatBox>
      <Footer></Footer>
    </div>
  </div>
</template>

<script setup>
import Aside from "./Aside/index.vue";
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
    width: 20%;
    background-color: #f0f0f0;
  }
  .right {
    width: 80%;
    display: flex;
    flex-direction: column;
  }
}
</style>
