import { getPermissionMenuAllListApi } from '@/api/permission/menu';

export const getRouterAll = async () => {
  const { data } = await getPermissionMenuAllListApi();
  if (data.code === 0) {
    let dataList = [];
    let dataSource = [];
    const list = data.data || [];
    const menuList = list.filter(item => item.type === 1);
    menuList.map(item => {
      const obj = {
        // id: item.id,
        path: item.path, // 前端路径
        name: item.name, // 名称
        icon: item.icon, // 图标
        // sort: item.sort, // 排序
        // type: item.type, // 权限类型:1菜单,0控制器
        // status: item.status, // 是否展示1,0:
        // parentId: item.parentId, // 上级
        // component: () => import('@/views/permission/menu/form')
        meta: {
          id: item.id,
          type: item.type,
          status: item.status,
          sort: item.sort,
          parentId: item.parentId
        },
        component: () => import('@/views' + item.component)
      };
      dataList.push(obj);
    });
    const getTree = function (arr, parentId = 0) {
      let newArr = [];
      arr.forEach(item => {
        if (item.meta.parentId == parentId) {
          newArr.push({
            ...item,
            children: getTree(arr, item.meta.id)
          });
        }
      });
      return newArr;
    };
    dataSource = getTree(dataList, 0);
    // console.log('侧边栏---', dataSource);

    return dataSource;
    // return [2, 3, 4];
  }
};
