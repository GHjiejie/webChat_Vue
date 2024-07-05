<template>
  <div class="fileview">
    <div class="viewBox">
      <div class="fileIcon">
        <img
          v-if="fileType === 'pdf'"
          src="../../assets/images/pdf.png"
          alt="pdf"
        />
        <img
          v-if="fileType === 'docx'"
          src="../../assets/images/docx.png"
          alt="docx"
        />
        <img
          v-if="fileType === 'zip'"
          src="../../assets/images/zip.png"
          alt="zip"
        />
        <img
          v-if="fileType === 'txt'"
          src="../../assets/images/txt.png"
          alt="txt"
        />
        <img
          v-if="fileType === 'unknown'"
          src="../../assets/images/unknown.png"
          alt="unknown"
        />
      </div>
      <div class="fileInfo">
        <div class="fileName">{{ fileName }}</div>
        <div class="operation">
          <a
            v-if="fileType === 'pdf' || fileType === 'txt'"
            :href="fileUrl"
            target="_blank"
            >预览</a
          >
          <a
            v-if="fileType === 'zip' || fileType === 'docx'"
            :href="fileUrl"
            :download="fileName"
            >下载</a
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { defineProps } from "vue";

const props = defineProps({
  fileName: String,
  fileType: String,
  fileUrl: String,
});
</script>
<style scoped lang="scss">
.fileview {
  display: flex;
  width: 100%;
  height: 100%;
  margin-top: 2rem;
}

.viewBox {
  display: flex;
  align-items: center;
  padding: 0.8rem;
  transition: all 0.3s ease-in-out;
}
.fileIcon {
  width: 3rem;
  height: 3rem;
  img {
    width: 100%;
    height: 100%;
  }
}

.fileInfo {
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
  gap: 1rem;
  .fileName {
    font-size: 1rem;
    font-weight: bold;
  }
  .operation {
    display: flex;
    gap: 1rem;
    a {
      font-size: 1rem;
      color: #1890ff;
      text-decoration: none;
      transition: all 0.3s ease-in-out;
      &:hover {
        color: red;
      }
    }
  }
}

.sender {
  background-color: #95ec69;
  border-radius: 0.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.receiver {
  background-color: #ffffff;
  border-radius: 0.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
