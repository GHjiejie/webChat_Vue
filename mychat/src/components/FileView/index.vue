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
        <div class="fileName">{{ fileInfo.name }}</div>
        <div class="fileSize">{{ getFileSize(fileInfo.size) }}</div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, defineProps, onBeforeMount, defineEmits, watch } from "vue";
import { getFileSize, getFileType } from "@/utils/file";
import { handleSendFile } from "@/apis/chat";
const emit = defineEmits(["sendFileSuccess"]);
const props = defineProps({
  fileInfo: Object,
});
const fileType = ref("");
onBeforeMount(async () => {
  fileType.value = getFileType(props.fileInfo.type);
  // console.log("输出文件类型", fileType.value);
  await handleFile();
});
const handleFile = async () => {
  const formData = new FormData();
  formData.append("file", props.fileInfo);
  const res = await handleSendFile(formData);
  // console.log("输出文件上传结果", res);
  if (res.data.code === 200) {
    emit("sendFileSuccess", {
      ...res.data,
      type: fileType.value,
    });
  }
};
watch(
  () => props.fileInfo,
  async () => {
    // console.log("文件信息变化", props.fileInfo);
    fileType.value = getFileType(props.fileInfo.type);
    await handleFile();
  }
);
</script>
<style scoped lang="scss">
.fileview {
  display: flex;
  width: 100%;
  height: 100%;
  margin-left: 0.5rem;

  // background-color: red;
}

.viewBox {
  display: flex;
  align-items: center;
  width: 20%;
  background: #fff;
  border-radius: 0.5rem;
  // box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 0.5rem;
  transition: all 0.3s ease-in-out;
}

.viewBox:hover {
  transform: scale(1.05);
}

.fileIcon {
  flex-shrink: 0;
  margin-right: 20px;
}

.fileIcon img {
  width: 50px;
  height: 50px;
}

.fileInfo {
  display: flex;
  flex-direction: column;
}

.fileName {
  font-weight: bold;
  font-size: 1.2em;
  margin-bottom: 5px;
}

.fileSize {
  color: #555;
}
</style>
