import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    menuList: JSON.parse(sessionStorage.getItem('menuList') || '[]')
  },
  mutations: {
    //存储菜单栏
    SET_MENU_LIST(state, data) {
      console.log('3333', state, data);
      state.menuList = data;
      /**刷新页面菜单栏消失，解决从Vuex中获取数据后刷新页面数据消失问题
       *原因分析:
       * 因为菜单栏数据是登录成功之后获取的，获取菜单栏数据后，存放在Vuex中
       * 一旦刷新页面，Vuex中的数据会重新初始化，所以会变成空的数组
       * 因此，需要将权限数据存储在sessionStorage中，并让其和Vuex中的数据保持同步
       */
      sessionStorage.setItem('menuList', JSON.stringify(data));
    }
  },
  getters: {
    getMenuList: state => state.menuList
  },
  actions: {},
  modules: {}
});
