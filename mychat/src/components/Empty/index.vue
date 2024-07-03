<template>
  <el-empty :image-size="ImageSize" />
</template>
<script setup>
import { defineProps } from "vue";
const props = defineProps({
  //   image: String,
  imageSize: {
    type: Number,
    default: 200,
  },
});
</script>
