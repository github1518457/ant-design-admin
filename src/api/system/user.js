import request from '../request';

// 用户 列表
export const getSystemUserList = params => {
  return request.get('/api/system/user/list', params);
};
// 用户 新增
export const postSystemUserAdd = params => {
  return request.post('/api/system/user/add', params);
};
