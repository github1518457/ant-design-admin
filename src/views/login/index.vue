<template>
  <a-card>
    <a-form
      :form="form"
      style="padding: 0 20%"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 12 }"
      @submit="handleSubmit"
    >
      <a-form-item label="账号">
        <a-input
          allowClear
          v-decorator="['user_name', { rules: validate.user_name }]"
        />
      </a-form-item>

      <a-form-item label="密码">
        <a-input
          allowClear
          v-decorator="['password', { rules: validate.password }]"
        />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
        <a-space>
          <a-button @click="handleReset"> 重置 </a-button>
          <a-button type="primary" html-type="submit"> 确定 </a-button>
        </a-space>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script>
/* eslint no-empty: ["error", { "allowEmptyCatch": true }] */
import { postLoginApi } from '@/api/login';
export default {
  data() {
    return {
      menuAll: [],
      form: this.$form.createForm(this, { name: 'coordinated' }),
      validate: {
        user_name: [{ required: true, message: '请输入用户名' }],
        password: [{ required: true, message: '请输入密码' }]
      }
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields(async (err, values) => {
        if (!err) {
          const { data } = await postLoginApi({ ...values });
          if (data.code === 0) {
            this.$message.success(data.msg);
            let menuList = [];
            const list = data.data || [];
            const getTree = function (arr, parentId = 0) {
              let newArr = [];
              arr.forEach(item => {
                if (item.parentId == parentId) {
                  newArr.push(item);
                }
                const children = arr.filter(data => data.parentId == item.id);
                if (!children.length) return;
                item.children = children;
              });
              return newArr;
            };
            menuList = getTree(list, 0);
            // console.log(555, getTree(list, 0));
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

            this.$store.commit('SET_MENU_LIST', menuList);
            this.$router.push('/home');
          } else {
            this.$message.warning(data.msg);
          }
        }
      });
    },
    handleReset() {
      this.form.resetFields();
    }
  },
  mounted() {}
};
</script>

<style scoped></style>
