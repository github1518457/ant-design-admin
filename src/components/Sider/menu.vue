<template>
  <div class="tree">
    <div v-for="item in treeData" :key="item.path">
      <ul
        v-if="item.children && item.children.length"
        @click="handleTitle(item)"
        class="vm-ul"
      >
        <li>
          <a-icon
            type="property-safety"
            style="font-size: 28px; vertical-align: middle; margin-right: 10px"
          />
        </li>
        <li style="width: 100%">{{ item.name }}</li>
        <li v-if="!item.meta.isDisplay">
          <a-icon
            type="caret-down"
            :style="{
              display: 'inline-block',
              transition: ' transform .3s',
              transform: isOpen(item.path) ? 'rotate(180deg)' : 'rotate(0deg)'
            }"
          />
        </li>
      </ul>

      <!-- <ul
        v-if="item.children && item.children.length && item.meta.isDisplay"
        @click="handleTitle(item)"
        class="vm-ul"
      >
        <li>
          <a-icon
            type="property-safety"
            style="font-size: 28px; vertical-align: middle; margin-right: 10px"
          />
        </li>
        <li style="width: 100%">{{ item.name }}</li>
      </ul> -->
      <!-- <ul
        v-if="item.children && item.children.length && !item.meta.isDisplay"
        @click="handleTitle(item)"
        class="vm-ul"
      >
        <li>
          <a-icon
            type="property-safety"
            style="font-size: 28px; vertical-align: middle; margin-right: 10px"
          />
        </li>
        <li style="width: 100%">{{ item.name }}</li>
        <li>
          <a-icon
            type="caret-down"
            :style="{
              display: 'inline-block',
              transition: ' transform .3s',
              transform: isOpen(item.path) ? 'rotate(180deg)' : 'rotate(0deg)'
            }"
          />
        </li>
      </ul> -->
      <!-- <ul v-if="!item.children" @click="handleTitle(item)" class="vm-ul">
        <li>
          <a-icon
            type="property-safety"
            style="font-size: 28px; vertical-align: middle; margin-right: 10px"
          />
        </li>
        <li style="width: 100%">{{ item.name }}</li>
        <li>
          <a-icon
            type="caret-down"
            :style="{
              display: 'inline-block',
              transition: ' transform .3s',
              transform: isOpen(item.path) ? 'rotate(180deg)' : 'rotate(0deg)'
            }"
          />
        </li>
      </ul> -->
      <!-- <ul
        v-if="item.children && item.children.length"
        @click="handleTitle(item)"
        class="vm-ul"
      >
        <li>
          <a-icon
            type="property-safety"
            style="font-size: 28px; vertical-align: middle; margin-right: 10px"
          />
        </li>
        <li style="width: 100%">{{ item.name }}</li>
        <li>
          <a-icon
            type="caret-down"
            :style="{
              display: 'inline-block',
              transition: ' transform .3s',
              transform: isOpen(item.path) ? 'rotate(180deg)' : 'rotate(0deg)'
            }"
          />
        </li>
      </ul> -->
      <ul v-else class="vm-ul" @click="handleRouter(item)">
        <li>
          <a-icon
            type="property-safety"
            style="font-size: 28px; vertical-align: middle; margin-right: 10px"
          />
        </li>
        <li style="width: 100%">{{ item.name }}</li>
      </ul>
      <div
        v-if="item.children && item.children.length && !item.meta.isDisplay"
        v-show="isOpen(item.path)"
      >
        <vm-menu
          :treeData="item.children"
          @handle-click="$emit('handle-click', $event)"
        ></vm-menu>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'vm-menu',
  props: {
    treeData: {
      type: Array,
      default: () => []
    },
    isIcon: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    isIcon: {
      handler(newVal, oldVal) {
        this.isFlag = newVal;
      },
      deep: true
    }
  },
  data() {
    return {
      isFlag: false,
      hideInMenu: [],
      expandedKeys: [] // 当前列表需要展开的节点id组成的数组
    };
  },
  methods: {
    handleTitle(item) {
      console.log('vmvmvm', item);
      // const vmBgColor = document.getElementById('vm-bg-color');

      // vmBgColor.style.backgroundColor = '#e6f7ff'; //background
      // vmBgColor.style.background = '#e6f7ff'; //background
      // let list = [];
      // if (item.children && item.children.length > 0) {
      //   item.children.map(item => {
      //     if (item.hideInMenu) {
      //       list.push(item.hideInMenu);
      //     }
      //   });
      // }
      // this.hideInMenu = list;
      // console.log('item', item);
      this.$emit('handle-click', item);
      if (item.children && item.children.length) {
        let index = this.expandedKeys.indexOf(item.path);
        if (index > -1) {
          // 如果当前节点id存在数组中，则删除
          this.expandedKeys.splice(index, 1);
        } else {
          // 如果当前节点id不存在数组中，则添加
          this.expandedKeys.push(item.path);
        }
      }
      if (item.meta.isDisplay) {
        this.$router.push('/permission/menu');
      }

      // console.log('expandedKeys', this.expandedKeys);
    },
    handleRouter(item) {
      this.$router.push(item.path);
    },
    isOpen(id) {
      // 判断节点id在不在数组中，在则显示，不在则隐藏
      // if (this.isFlag) {
      //   return this.expandedKeys.includes(id);
      // }
      return this.expandedKeys.includes(id);
    }
  }
};
</script>

<style scoped>
/* #1890ff    background-color: #e6f7ff; */
.vm-ul {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px !important;
  /* border: 1px solid red; */
  cursor: pointer;
}
.vm-ul:hover {
  color: #1890ff;
}
/* .vm-ul:hover {
  background: #eee;
} */
.vm-title {
  padding: 12px 20px;
  color: #2c3e50;
  /* color: rgba(0, 0, 0, 0.65); */
}
.vm-title:hover {
  color: #1890ff;
}
/* .vm-title:hover {
  background: #eee;
} */

/* .tree { */
/* cursor: pointer; */
/* color: #fff; */
/* border: 1px solid yellowgreen; */

/* background-color: rgba(27, 27, 27, 0.85); */
/* } */
/* .tree-border {
  border: 1px solid red;
} */
/* .menu-title { */
/* border: 1px solid red; */
/* display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 10px;
  background: yellow; */
/* padding: 4px 10px;
  overflow: hidden;
  border: 1px solid red; */
/* padding: 12px 10px;
  background: yellow; */
/* } */
/* .menu-title:hover { */
/* background: #eee; */
/* background-color: hsla(0, 0%, 78.4%, 0.2); */
/* } */
/* .item-child {
  padding-left: 15px;
} */
/* .menu-icon {
  float: right;
} */
/* .ant-layout-sider {
  background: #3ba0e9;
  background: yellowgreen;
  color: #fff;
  line-height: 48px;
  height: 100vh;
  overflow-y: auto;

  flex: 0 0 400px !important;
  max-width: 400px !important;
  min-width: 400px;
  width: 400px;
} */
/* .ant-layout-sider::-webkit-scrollbar {
  width: 10px;
  background-color: #fff;
}
.ant-layout-sider::-webkit-scrollbar-thumb {
  background: #eee;
}
.ant-layout-sider:hover::-webkit-scrollbar-thumb:vertical {
  background-color: #eee;
} */
</style>
