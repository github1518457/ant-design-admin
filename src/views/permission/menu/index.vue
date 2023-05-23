<template>
  <div>
    <vm-search @handleSearch="handleSearch"></vm-search>
    <a-card>
      <a-row type="flex" justify="space-between" style="margin-bottom: 10px">
        <a-col></a-col>
        <a-col>
          <a-button
            type="primary"
            @click="$router.push('/permission/menu/create')"
            >新建</a-button
          >
        </a-col>
      </a-row>
      <a-table
        bordered
        :columns="columns"
        :data-source="dataSource"
        rowKey="id"
        :pagination="pagination"
      >
        <template slot="id" slot-scope="text">
          <a-space>
            <a-button
              type="primary"
              size="small"
              @click="$router.push('/permission/menu/update?id=' + text)"
            >
              编辑</a-button
            >
            <a-popconfirm
              title="是否确定删除该条数据？"
              ok-text="确定"
              cancel-text="取消"
              placement="topRight"
              @confirm="handleDelete(text)"
            >
              <a-button type="danger" size="small">删除</a-button>
            </a-popconfirm>
          </a-space>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script>
import VmSearch from './search.vue';
import {
  getPermissionMenuListApi,
  deletePermissionMenuDeleteApi
} from '@/api/permission/menu';
export default {
  components: { VmSearch },
  data() {
    return {
      form: {},
      pagination: {
        total: 0,
        current: 1,
        pageSize: 10,
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '30', '40', '50', '100'],
        showTotal: total => `共 ${total} 条`,
        onChange: (current, pageSize) => {
          this.pagination.current = current;
          this.pagination.pageSize = pageSize;
          this.getList();
        },
        onShowSizeChange: (current, size) => {
          this.pagination.current = current;
          this.pagination.pageSize = size;
          this.getList();
        }
      },
      dataSource: [],
      columns: [
        { title: '菜单名称', dataIndex: 'name', align: 'center' },
        { title: '菜单级别', dataIndex: 'parentId', align: 'center' },
        { title: '前端图标', dataIndex: 'icon', align: 'center' },
        { title: '前端路径', dataIndex: 'path', align: 'center' },
        { title: '是否展示', dataIndex: 'status', align: 'center' },
        { title: '排序', dataIndex: 'sort', align: 'center' },
        {
          title: '操作',
          dataIndex: 'id',
          align: 'center',
          width: 150,
          scopedSlots: { customRender: 'id' }
        }
      ]
    };
  },
  methods: {
    async handleSearch(val) {
      this.form = Object.assign({}, val);
      console.log('val', val);
      this.getList();
    },
    async getList() {
      const { data } = await getPermissionMenuListApi({
        page: this.pagination.current,
        pageSize: this.pagination.pageSize,
        ...this.form
      });
      if (data.code === 0) {
        this.dataSource = data.data.list;
        this.pagination.total = data.data.pagination.total;
      }
    },
    async handleDelete(id) {
      const { data } = await deletePermissionMenuDeleteApi(id);
      if (data.code === 0) {
        this.$message.success(data.msg);
        this.getList();
      }
    }
  },
  mounted() {
    this.getList();
  }
};
</script>

<style scoped></style>
