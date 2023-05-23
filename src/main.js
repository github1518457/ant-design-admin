import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './styles/index.css';

import 'ant-design-vue/dist/antd.css';
import {
  Button,
  message,
  Layout,
  Menu,
  Icon,
  Breadcrumb,
  Avatar,
  Table,
  Tag,
  Divider,
  Card,
  Row,
  Col,
  Form,
  Input,
  Select,
  Space,
  Radio,
  InputNumber,
  Popconfirm,
  ConfigProvider,
  TreeSelect
} from 'ant-design-vue';

Vue.use(Button);
Vue.use(Layout);
Vue.use(Menu);
Vue.use(Icon);
Vue.use(Breadcrumb);
Vue.use(Avatar);
Vue.use(Table);
Vue.use(Tag);
Vue.use(Divider);
Vue.use(Card);
Vue.use(Row);
Vue.use(Col);
Vue.use(Form);
Vue.use(Input);
Vue.use(Select);
Vue.use(Space);
Vue.use(Radio);
Vue.use(InputNumber);
Vue.use(Popconfirm);
Vue.use(ConfigProvider);
Vue.use(TreeSelect);

Vue.prototype.$message = message;
import Utils from './utils/index.js';
Vue.prototype.$utils = Utils;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
