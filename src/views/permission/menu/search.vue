<template>
  <div id="components-form-demo-advanced-search">
    <a-form
      class="ant-advanced-search-form"
      :form="form"
      @submit="handleSearch"
    >
      <a-row :gutter="24">
        <a-col :span="6" :style="{ display: 'block' }">
          <a-form-item label="菜单名称">
            <a-input v-decorator="['name']" placeholder="" />
          </a-form-item>
        </a-col>
        <!-- <a-col :span="6" :style="{ display: 'block' }">
          <a-form-item :label="`Field2`">
            <a-input v-decorator="[`field`]" placeholder="placeholder" />
          </a-form-item>
        </a-col>
        <a-col :span="6" :style="{ display: 'block' }">
          <a-form-item :label="`Field3`">
            <a-input v-decorator="[`field`]" placeholder="placeholder" />
          </a-form-item>
        </a-col>
        <a-col :span="expand ? 6 : 0">
          <a-form-item :label="`Field4`">
            <a-input v-decorator="[`field`]" placeholder="placeholder" />
          </a-form-item>
        </a-col>
        <a-col :span="expand ? 6 : 0">
          <a-form-item :label="`Field5`">
            <a-input v-decorator="[`field`]" placeholder="placeholder" />
          </a-form-item>
        </a-col>
        <a-col :span="expand ? 6 : 0">
          <a-form-item :label="`Field6`">
            <a-input v-decorator="[`field`]" placeholder="placeholder" />
          </a-form-item>
        </a-col> -->
        <a-col :span="expand ? 18 : 18" :style="{ textAlign: 'right' }">
          <a-button type="primary" html-type="submit"> 查询 </a-button>
          <a-button :style="{ marginLeft: '8px' }" @click="handleReset">
            重置
          </a-button>
          <!-- <a :style="{ marginLeft: '8px', fontSize: '12px' }" @click="toggle">
            {{ expand ? '收起' : '展开' }}
            <a-icon :type="expand ? 'up' : 'down'" />
          </a> -->
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      expand: false,
      form: this.$form.createForm(this, { name: 'advanced_search' })
    };
  },
  //   computed: {
  //     count() {
  //       return this.expand ? 6 : 6;
  //     }
  //   },
  //   updated() {
  //     console.log('updated');
  //   },
  methods: {
    handleSearch(e) {
      e.preventDefault();
      this.form.validateFields((error, values) => {
        console.log('error', error);
        console.log('Received values of form: ', values);
        this.$emit('handleSearch', values);
      });
    },

    handleReset() {
      this.form.resetFields();
    },

    toggle() {
      this.expand = !this.expand;
    }
  }
};
</script>
<style>
.ant-advanced-search-form {
  padding: 24px;
  background: #fff;
  /* border: 1px solid #d9d9d9; */
  /* border-radius: 6px; */
  margin-bottom: 20px;
}

.ant-advanced-search-form .ant-form-item {
  display: flex;
}

.ant-advanced-search-form .ant-form-item-control-wrapper {
  flex: 1;
}

#components-form-demo-advanced-search .ant-form {
  max-width: none;
}
/* #components-form-demo-advanced-search .search-result-list {
  margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  background-color: #fafafa;
  min-height: 200px;
  text-align: center;
  padding-top: 80px;
} */
</style>
