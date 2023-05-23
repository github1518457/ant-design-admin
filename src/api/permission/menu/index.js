import request from '@/api/request';

// 菜单 列表
export const getPermissionMenuListApi = async params => {
  return request('/api/v1/permission/menu/list', {
    method: 'GET',
    params: params,
    headers: { 'Content-Type': 'application/json' }
  });
};
// 菜单 下拉列表
export const getPermissionMenuAllApi = async () => {
  return request('/api/v1/permission/menu/all', {
    method: 'GET',
    params: {},
    headers: { 'Content-Type': 'application/json' }
  });
};
// 菜单 新增
export const postPermissionMenuCreateApi = async params => {
  return request('/api/v1/permission/menu/create', {
    method: 'POST',
    data: params,
    headers: { 'Content-Type': 'application/json' }
  });
};
// 菜单 详情
export const getPermissionMenuDetailApi = async id => {
  return request('/api/v1/permission/menu/detail/' + id, {
    method: 'GET',
    params: {},
    headers: { 'Content-Type': 'application/json' }
  });
};
// 菜单 删除
export const deletePermissionMenuDeleteApi = async id => {
  return request('/api/v1/permission/menu/delete/' + id, {
    method: 'DELETE',
    params: {},
    headers: { 'Content-Type': 'application/json' }
  });
};
// 菜单 更新
export const putPermissionMenuUpdateApi = async (id, params) => {
  return request('/api/v1/permission/menu/update/' + id, {
    method: 'PUT',
    data: params,
    headers: { 'Content-Type': 'application/json' }
  });
};
// 菜单 左侧边栏
export const getPermissionMenuAllListApi = async () => {
  return request('/api/v1/permission/menu/all/list', {
    method: 'GET',
    params: {},
    headers: { 'Content-Type': 'application/json' }
  });
};
