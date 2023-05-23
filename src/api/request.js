import axios from 'axios';

// 创建实例
const service = axios.create({
  // baseURL: process.env.NODE_ENV, // development
  baseURL: 'http://localhost:8095',
  timeout: 3000 // 请求超时时间
});

// 请求拦截
service.interceptors.request.use(
  config => {
    // 自定义header，可添加项目token
    // let token = localStorage.getItem("token")
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`
    // } else {
    //   console.log("no token")
    // }
    // if (store.state.app.token) {
    //   config.headers.token = store.state.app.token;
    //   config.headers.timestamp = new Date().getTime();
    // }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
// 响应拦截
service.interceptors.response.use(
  response => {
    // console.log('response', response);
    return response;
  },
  error => {
    // const code = error.response.status;
    // switch (code) {
    //   case 401:
    //     createApp.$Message.error("暂无权限")
    //     break
    //   case 404:
    //     createApp.$Message.error("网络请求不存在")
    //     break
    //   case 500:
    //     createApp.$Message.error("服务器连接错误")
    //     break
    //   default:
    //     createApp.$Message.error(error.response.data.message)
    // }
    return Promise.reject(error);
  }
);

export default service;
