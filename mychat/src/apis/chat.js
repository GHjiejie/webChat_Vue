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
