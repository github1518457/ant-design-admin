import request from "../request";

// 登录
export const login = (params) => {
  return request.post("/api/public/login", params);
};
