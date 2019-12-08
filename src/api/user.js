import request from "@/utils/request";

//登录接口
export function login(data) {
  console.log(data);
  return request({
    url: "http://132.232.89.22:8080/login",
    method: "post",
    data
  });
}

// 获取用户信息
export function getInfo(token) {
  return request({
    url: "http://132.232.89.22:8080/getadmin",
    method: "get",
    params: { token }
  });
}

export function logout() {
  return request({
    url: "/user/logout",
    method: "post"
  });
}
