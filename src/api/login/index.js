import request from '@/api/request';

// 登录
export const postLoginApi = async params => {
  return request('/api/v1/login', {
    method: 'POST',
    data: params,
    headers: { 'Content-Type': 'application/json' }
  });
};
