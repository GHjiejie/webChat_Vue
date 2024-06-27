<template>
  <div class="main">
    <el-container>
      <el-aside width="200px"><Aside></Aside></el-aside>
      <el-container>
        <el-header><Header></Header></el-header>
        <el-main><Main></Main></el-main>
        <el-footer><Footer></Footer></el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import Aside from "./Aside/index.vue";
import Footer from "./Footer/index.vue";
import Header from "./Header/index.vue";
import Main from "./Main/index.vue";
</script>

<style scoped lang="scss">
.main {
  height: 100vh;
  overflow: hidden;
  .el-container {
    height: 100%;
    .el-aside {
      width: 18%;
    }
    :deep(.el-header) {
      --el-header-padding: 0;
      --el-header-height: 80px;
    }
    .el-main {
      height: calc(100% - 80px);
      background-color: #ccc;
      color: #333;
    }
    :deep(.el-footer) {
      --el-footer-height: 100px;
      --el-footer-padding: 0;
    }
    .el-footer {
      height: 100px;
    }
  }
}
</style>
