import httpRequest from "@/request/index.js";
export function login(data) {
  return httpRequest({
    url: "user/login",
    method: "post",
    data,
  });
}
export function register(data) {
  return httpRequest({
    url: "user/register",
    method: "post",
    data,
  });
}
