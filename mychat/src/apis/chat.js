import httpRequest from "@/request/index.js";

// 创建私聊房间
export function createPrivateRoom(data) {
  return httpRequest({
    url: "/v1/chat/createPrivateRoom",
    method: "post",
    data,
  });
}

// 验证私聊房间是否存在
export function verifyPrivateRoom(data) {
  return httpRequest({
    url: "/v1/chat/verifyPrivateRoom",
    method: "post",
    data,
  });
}

// 获取所有的会话列表
export function getConversationList(params) {
  console.log("params", params);
  return httpRequest({
    url: `/v1/chat/getConversationList/${params.userId}`,
    method: "get",
  });
}

// 获取选定的会话
export function getSelectedConversation(params) {
  return httpRequest({
    url: `/v1/chat/getSelectedConversation/${params.conversationId}`,
    method: "get",
  });
}

// 根据conversationId获取聊天记录
export function getMessages(params) {
  return httpRequest({
    url: `/v1/chat/getMessages/${params.conversationId}`,
    method: "get",
  });
}

// 发送消息
export function sendMessage(data) {
  return httpRequest({
    url: "/v1/chat/sendMessage",
    method: "post",
    data,
  });
}

// 处理聊天过程中发送的文件
export function handleSendFile(data) {
  return httpRequest({
    url: "/v1/chat/sendFile",
    method: "post",
    data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
