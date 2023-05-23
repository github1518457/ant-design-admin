<template>
  <a-card>
    <a-row type="flex" justify="space-between" style="margin-bottom: 30px">
      <a-col>{{ this.$route.query.id ? '编辑' : '新增' }}</a-col>
      <a-col>
        <a-button @click="$router.push('/permission/menu')"
          >返回列表页</a-button
        >
      </a-col>
    </a-row>
    <a-form
      :form="form"
      style="padding: 0 20%"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 12 }"
      @submit="handleSubmit"
    >
      <a-form-item label="菜单名称">
        <a-input allowClear v-decorator="['name', { rules: validate.name }]" />
      </a-form-item>
      <a-form-item label="权限类型">
        <a-radio-group
          allowClear
          v-decorator="['type', { initialValue: 1, rules: validate.type }]"
        >
          <a-radio :value="1">菜单</a-radio>
          <a-radio :value="0">控制器</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="上级菜单">
        <a-tree-select
          v-decorator="['parentId', { rules: validate.parentId }]"
          style="width: 100%"
          :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
          placeholder="请选择"
          allow-clear
          :tree-data="menuAll"
          @change="handleTree"
          @select="handleSelect"
        >
          <!-- <a-icon slot="suffixIcon" type="smile" /> -->
          <!-- <a-tree-select-node :key="0" :value="0" title="无上级菜单" />
          <a-tree-select-node key="0-1" value="parent 1" title="parent 1">
            <a-tree-select-node
              key="0-1-1"
              value="parent 1-0"
              title="parent 1-0"
            >
              <a-tree-select-node key="random" value="leaf1" title="my leaf" />
              <a-tree-select-node
                key="random1"
                value="leaf2"
                title="your leaf"
              />
            </a-tree-select-node> -->
          <!-- <a-tree-select-node
              key="random2"
              value="parent 1-1"
              title="parent 1-1"
            >
              <a-tree-select-node key="random3" value="sss">
                <b slot="title" style="color: #08c">sss</b>
              </a-tree-select-node>
            </a-tree-select-node> -->
          <!-- </a-tree-select-node> -->
        </a-tree-select>
        <!-- <a-select
          allowClear
          v-decorator="['parentId', { rules: validate.parentId }]"
          placeholder="请选择"
          @change="handleSelectChange"
        >
          <a-select-option
            v-for="item in menuAll"
            :key="item.id"
            :value="item.id"
          >
            {{ item.name }}
          </a-select-option>
        </a-select> -->
      </a-form-item>
      <a-form-item label="是否展示">
        <a-radio-group
          allowClear
          v-decorator="['status', { initialValue: 1, rules: validate.status }]"
        >
          <a-radio :value="1">是</a-radio>
          <a-radio :value="0">否</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="前端路径">
        <a-input allowClear v-decorator="['path']" />
      </a-form-item>
      <a-form-item label="前端图标">
        <a-input allowClear v-decorator="['icon']" />
      </a-form-item>
      <a-form-item label="排序">
        <a-input-number
          allowClear
          :min="0"
          :precision="0"
          v-decorator="['sort', { initialValue: 0 }]"
          style="width: 100%"
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
import {
  postPermissionMenuCreateApi,
  getPermissionMenuDetailApi,
  getPermissionMenuAllApi,
  putPermissionMenuUpdateApi
} from '@/api/permission/menu';
export default {
  data() {
    return {
      menuAll: [],
      form: this.$form.createForm(this, { name: 'coordinated' }),
      validate: {
        name: [{ required: true, message: '请输入菜单名称' }],
        type: [{ required: true, message: '请选择展示类型' }],
        parentId: [{ required: true, message: '请选择上级菜单' }],
        status: [{ required: true, message: '请选择是否展示' }]
      }
    };
  },
  methods: {
    async getDetail() {
      const { data } = await getPermissionMenuDetailApi(this.$route.query.id);
      if (data.code === 0) {
        this.form.setFieldsValue({
          name: data.data.name,
          type: data.data.type,
          parentId: data.data.parentId,
          status: data.data.status,
          path: data.data.path,
          icon: data.data.icon,
          sort: data.data.sort
        });
      }
    },
    async getListAll() {
      const { data } = await getPermissionMenuAllApi();
      if (data.code === 0) {
        let dataList = [];
        let dataSource = [];
        const list = data.data || [];
        list.map(item => {
          const obj = {
            title: item.name,
            value: item.id,
            key: item.id,
            parentId: item.parentId
          };
          dataList.push(obj);
        });
        const getTree = function (arr, parentId = 0) {
          let newArr = [];
          arr.forEach(item => {
            if (item.parentId == parentId) {
              newArr.push({
                ...item,
                children: getTree(arr, item.value)
              });
            }
          });
          return newArr;
        };
        dataSource = getTree(dataList, 0);
        this.menuAll = [
          { title: '无上级菜单', value: 0, key: 0, parentId: 0 },
          ...dataSource
        ];
      }
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields(async (err, values) => {
        console.log('values', values);
        if (!err) {
          const { data } = this.$route.query.id
            ? await putPermissionMenuUpdateApi(this.$route.query.id, {
                id: this.$route.query.id,
                ...values
              })
            : await postPermissionMenuCreateApi({ ...values });
          if (data.code === 0) {
            this.$message.success(data.msg);
            this.$router.push('/permission/menu');
          }
        }
      });
    },
    handleSelectChange(value) {
      console.log(value);
    },
    handleReset() {
      this.form.resetFields();
    },
    handleTree(value, label, extra) {
      console.log('bv1', value);
      console.log('bv2', label);
      console.log('bv3', extra);
    },
    handleSelect(value, node, extra) {
      console.log('bv11', value);
      console.log('bv22', node);
      console.log('bv33', extra);
    }
  },
  mounted() {
    this.getListAll();
    if (this.$route.query.id) {
      this.getDetail();
    }
  }
};
</script>

<style scoped></style>
