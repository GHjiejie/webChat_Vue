import httpRequest from "@/request/index.js";
// 登录接口
export function login(data) {
  return httpRequest({
    url: "/v1/user/login",
    method: "post",
    data,
  });
}
// 注册接口
export function register(data) {
  return httpRequest({
    url: "/v1/user/register",
    method: "post",
    data,
  });
}

//获取用户信息
export function getUserInfo(userId) {
  return httpRequest({
    url: `/v1/user/info/${userId} `,
    method: "get",
  });
}

// 搜索用户
export function searchUser(keywords) {
  return httpRequest({
    url: `/v1/user/searchFriend/${keywords}`,
    method: "get",
  });
}

// 添加好友申请
export function applyFriend(data) {
  return httpRequest({
    url: "/v1/user/friendRequest",
    method: "post",
    data,
  });
}

// 同意好友申请
export function agreeFriend() {
  return httpRequest({
    url: "/v1/user/acceptFriendRequest",
    method: "post",
    data: {
      userId: "667eb90e126801450046e054",
      fromUserId: "667eb913126801450046e057",
    },
  });
}

// 拒绝好友申请
export function refuseFriend() {
  return httpRequest({
    url: "/v1/user/rejectFriendRequest",
    method: "post",
    data: {
      userId: "667eb913126801450046e057",
      fromUserId: "667ebc46a4667df3327aed44",
    },
  });
}
