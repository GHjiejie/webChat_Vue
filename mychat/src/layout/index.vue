<template>
  <div class="layout">
    <div class="left">
      <FunctionMenu></FunctionMenu>
    </div>
    <div class="right">
      <router-view></router-view>
    </div>
  </div>
</template>
<script setup>
import FunctionMenu from "@/views/FunctionMenu/index.vue";
</script>
<style lang="scss" scoped>
.layout {
  display: flex;
  ::-webkit-scrollbar {
    width: 0px;
  }
  .left {
    width: 5%;
    background-color: #f0f0f0;
  }
  .right {
    width: 95%;
    display: flex;
    flex-direction: column;
  }
}
</style>
