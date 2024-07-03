// 获取文件大小
export const getFileSize = (size) => {
  if (!size) return "0B";
  const formatSize =
    size < 1024
      ? Number(size) + "B"
      : size < 1024 * 1024
      ? (Number(size) / 1024).toFixed(2) + "KB"
      : size < 1024 * 1024 * 1024
      ? (Number(size) / 1024 / 1024).toFixed(2) + "MB"
      : (Number(size) / 1024 / 1024 / 1024).toFixed(2) + "MB";
  return formatSize;
};

// 获取文件类型
// 获取文件类型
export const getFileType = (type) => {
  console.log(type); // 输出文件类型
  const typeMap = {
    "application/pdf": "pdf",
    "text/plain": "txt",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      "docx",
    "application/zip": "zip",
    "application/x-zip-compressed": "zip",
  };
  return typeMap[type] || "unknown"; // 如果没有匹配到，返回 'unknown'
};
