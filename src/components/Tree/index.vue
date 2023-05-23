<template>
  <div class="tree">
    <div v-for="item in treeData" :key="item.id">
      <div class="item-title" @click="handleTitle(item)">
        <div>
          <span>{{ item.name }}</span>
          <span class="item-icon" v-if="item.children && item.children.length">
            <span
              :style="{
                display: 'inline-block',
                transition: ' transform .3s',
                transform: isOpen(item.id) ? 'rotate(180deg)' : 'rotate(0deg)'
              }"
            >
              <svg
                t="1682147408533"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="4389"
                width="14"
                height="14"
              >
                <path
                  d="M910.222222 796.444444c-17.066667 0-34.133333-5.688889-45.511111-17.066666L551.822222 409.6c-11.377778-5.688889-17.066667-11.377778-34.133333-11.377778-5.688889 0-22.755556 5.688889-28.444445 11.377778l-329.955555 364.088889c-22.755556 22.755556-56.888889 22.755556-79.644445 5.688889-22.755556-22.755556-22.755556-56.888889-5.688888-79.644445l329.955555-364.088889c28.444444-34.133333 73.955556-51.2 119.466667-51.2s85.333333 22.755556 119.466666 56.888889l312.888889 364.088889c22.755556 22.755556 17.066667 56.888889-5.688889 79.644445-11.377778 5.688889-28.444444 11.377778-39.822222 11.377777z"
                  fill="#999999"
                  p-id="4390"
                ></path></svg
            ></span>
          </span>
        </div>
      </div>
      <div
        v-if="
          item.children &&
          item.children.length &&
          expandedKeys.includes(item.id)
        "
        class="item-child"
      >
        <vm-tree
          :treeData="item.children"
          @handle-click="$emit('handle-click', $event)"
        ></vm-tree>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'vm-tree',
  props: {
    treeData: {
      type: Array,
      default: () => []
    }
    // ids: {
    //   type: String,
    //   default: ''
    // }
  },
  data() {
    return {
      expandedKeys: [] // 当前列表需要展开的节点id组成的数组
    };
  },
  methods: {
    handleTitle(item) {
      console.log('item', item);
      // this.$emit('handle-click', item);
      if (item.children && item.children.length) {
        let index = this.expandedKeys.indexOf(item.id);
        if (index > -1) {
          // 如果当前节点id存在数组中，则删除
          this.expandedKeys.splice(index, 1);
        } else {
          // 如果当前节点id不存在数组中，则添加
          this.expandedKeys.push(item.id);
        }
      }
    },
    isOpen(id) {
      // 判断节点id在不在数组中，在则显示，不在则隐藏
      console.log('isOpen', id, this.expandedKeys);
      return this.expandedKeys.includes(id);
    }
  }
};
</script>

<style scoped>
.tree {
  cursor: pointer;
  color: #fff;
  /* background-color: rgba(27, 27, 27, 0.85); */
}
.item-title {
  padding: 4px 8px;
  overflow: hidden;
}
.item-title:hover {
  /* background: #eee; */
  background-color: hsla(0, 0%, 78.4%, 0.2);
}
.item-child {
  padding-left: 15px;
}
.item-icon {
  float: right;
}
/* .tree {
 cursor: pointer;
  .item-title {
    padding: 4px 8px;
    overflow: hidden;
    &:hover {
      background: #eee;
    }
  }
  .item-child {
    padding-left: 15px;
  }
  .item-icon {
    display: inline-block;
    // float: right;
    .iconfont {
      display: inline-block;
      font-size: 14px;
    }
  }
} */
</style>
