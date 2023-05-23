import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';
import Layout from '../components/Layout';
import RouterView from '@/views/index';
import { getRouterAll } from './auth';

Vue.use(VueRouter);

var arr = [
  {
    //
    path: '/permission',
    name: '权限管理',
    icon: 'interaction',
    meta: { type: 1, status: 1 },
    component: RouterView,
    children: [
      {
        path: '/permission/user',
        name: '用户',
        meta: { type: 1, status: 1 },
        component: () => import('@/views/permission/user')
      },
      {
        path: '/permission/role',
        name: '角色',
        meta: { type: 1, status: 1 },
        component: () => import('@/views/permission/role')
      },
      {
        path: '/permission/menu',
        name: '菜单',
        meta: { type: 1, status: 1 },
        // component: RouterView
        component: () => import('@/views/permission/menu')
        // children: [
        //   {
        //     path: '/permission/menu/create',
        //     name: '新增菜单',
        //     meta: { type: 0, status: 1 },
        //     component: () => import('@/views/permission/menu/form')
        //   },
        //   {
        //     path: '/permission/menu/update',
        //     name: '编辑菜单',
        //     meta: { type: 0, status: 1 },
        //     component: () => import('@/views/permission/menu/form')
        //   }
        // ]
      },
      {
        path: '/permission/menu/create',
        name: '新增菜单',
        meta: { type: 0, status: 1 },
        component: () => import('@/views/permission/menu/form')
      },
      {
        path: '/permission/menu/update',
        name: '编辑菜单',
        meta: { type: 0, status: 1 },
        component: () => import('@/views/permission/menu/form')
      }
    ]
  }
];
function flatten(arr) {
  let result = [];
  arr.forEach((item, i, arr) => {
    if (Array.isArray(item)) {
      result = result.concat(flatten(item));
    } else {
      result.push(arr[i]);
    }
  });
  return result;
}
console.log(123456, flatten(arr));
// function arrayToTree(list) {
//   const treeData = [];
//   list.forEach(item => {
//     if (item.pid == 1) {
//       treeData.push(item);
//     }
//     const children = list.filter(data => data.pid == item.id);
//     if (!children.length) return;
//     item.children = children;
//   });
//   return treeData;
// }
// var list = [
//   { name: '基本概括', pid: 1, id: 11 },
//   { name: '基本介绍', pid: 11, id: 111 },
//   { name: '基本经理', pid: 111, id: 1111 },
//   { name: '基本回报', pid: 1, id: 12 },
//   { name: '业绩表现', pid: 12, id: 112 }
// ];
// console.log(3333333333333, arrayToTree(list));
let menuRouter = [];
const menuList = store.getters.getMenuList || [];
// component: () => import('@/views' + item.component)
// let objII = new Object()
//   objIII.component = () => import('@/views/' + x)
menuList.map(item => {
  let obj = new Object();
  obj.path = item.path;
  obj.name = item.name;
  obj.icon = item.icon;
  // obj.children = item.children;
  obj.component = () => import('@/views' + item.component);
  // item.component = () => import('@/views' + item.component);
  // const obj = {
  //   // ...item
  //   path: item.path,
  //   name: item.name,
  //   icon: item.icon,
  //   meta: {}
  //   // children: item.children,
  //   // component: () => import('@/views' + item.component)
  // };
  // item.component = () => import('@/views' + item.meta.component);
  menuRouter.push(obj);
});

console.log('iiiii---2666', menuRouter);
// function recursivefilter(arr) {
//   let newArr = [];
//   arr.forEach(item => {
//     if (item.children.length === 0) {
//       // delete item.children;
//       console.log('item-item', item.children);
//       newArr.push({
//         path: item.path,
//         name: item.name,
//         icon: item.icon,
//         meta: item.meta
//       });
//     } else {
//       newArr.push({
//         path: item.path,
//         name: item.name,
//         icon: item.icon,
//         meta: item.meta,
//         children: item.children
//       });
//       console.log('item-item-item', item.children);
//     }
//     if (item.children && item.children.length > 0) {
//       recursivefilter(item.children);
//     }

//     // return true;
//   });
//   return newArr;
// }
// recursivefilter(menuRouter);

// console.log('ggggggggg', recursivefilter(menuRouter));
// console.log(arr , "PON")

// const getsex = function (arr) {
//   // let newArr = [];
//   arr.forEach(item => {
//     console.log('bbbb', item);
//     if (item.children && item.children.length === 0) {
//       delete item.children;
//       getsex(item.children);
//     }
//     // if (item.children.length === 0) {
//     //   delete item.children;
//     //   newArr.push({ ...item });
//     //   getsex(item.children);
//     // }
//   });
//   // return newArr;
// };
// getsex(menuRouter);
// console.log('#####', getsex(menuRouter));

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: '登录',
      component: () => import('@/views/login')
    },
    {
      path: '/index',
      name: 'index',
      component: Layout,
      children: [
        {
          path: '/home',
          name: '首页',
          icon: 'interaction',
          meta: { type: 1, status: 1 },
          component: () => import('@/views/home')
        }
      ]
    },
    // ...menuRouter
    {
      path: '/permission',
      name: '权限管理',
      icon: 'interaction',
      meta: { type: 1, status: 1, isDisplay: false, router: '/' },
      component: Layout,
      children: [
        {
          path: '/permission/menu',
          name: '菜单',
          meta: {
            type: 1,
            status: 1,
            isDisplay: true,
            router: '/permission/menu'
          },
          component: RouterView,
          children: [
            {
              path: '/permission/menu',
              name: '菜单列表',
              meta: { type: 0, status: 1, isDisplay: false },
              component: () => import('@/views/permission/menu')
            },
            {
              path: '/permission/menu/create',
              name: '新增菜单',
              meta: { type: 0, status: 1, isDisplay: false },
              component: () => import('@/views/permission/menu/form')
            },
            {
              path: '/permission/menu/update',
              name: '编辑菜单',
              meta: { type: 0, status: 1, isDisplay: false },
              component: () => import('@/views/permission/menu/form')
            }
          ]
        },
        {
          path: '/permission/user',
          name: '用户',
          meta: { type: 1, status: 1, isDisplay: false },
          component: () => import('@/views/permission/user')
        },
        {
          path: '/permission/role',
          name: '角色',
          meta: { type: 1, status: 1, isDisplay: false },
          component: () => import('@/views/permission/role')
        }
      ]
    }
  ]
});
//解决重复点击路由报错问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};
router.beforeEach((to, from, next) => {
  next();
  // if (to.path === '/login') {
  // 	next();
  // } else {
  // 	const token = sessionStorage.getItem('token');
  // 	if (!token) {
  // 		next('/login');
  // 	} else {
  // 		next();
  // 	}
  // }
});

export default router;
