<template>
  <div class="sider" :class="[isMarginLeft ? 'max-width' : 'min-width']">
    <ul class="vm-logo">
      <li>
        <a-avatar
          style="
            background-color: rgb(135, 208, 104);
            margin-right: 10px;
            cursor: pointer;
          "
          icon="user"
        />
        <span v-if="isIcon">Vue MD PRO</span>
      </li>
    </ul>
    <vm-menu
      :tree-data="treeData"
      :isIcon="isIcon"
      @handle-click="handleClick"
    ></vm-menu>
  </div>
</template>
<script>
import VmMenu from './menu';
export default {
  components: { VmMenu },
  props: {
    isMarginLeft: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    isMarginLeft: {
      handler(newVal, oldVal) {
        this.isIcon = newVal;
      },
      deep: true
    }
  },
  data() {
    return {
      isIcon: false,
      treeData: []
    };
  },
  methods: {
    getRouter() {
      // this.treeData = this.$router.options.routes.filter(
      //   item => item.name !== 'main' && item.path !== '/'
      // );
      this.treeData = this.$router.options.routes[0].children;
      this.treeData =
        this.$router.options.routes.filter(
          item => !['/', '/login', '/index'].includes(item.path)
        ) || [];
      console.log('99999999999999', this.treeData);
      // console.log(
      //   '7777',
      //   this.$router,
      //   this.$router.options.routes[0].children
      // );
    },
    handleClick(val) {
      // console.log('99999999999999', val);
      // this.ids = val.id;
      // console.log(val);
    }
  },
  mounted() {
    // console.log(4444, this.$store.getters.getMenuList);
    this.getRouter();
  }
};
</script>
<style scoped>
.sider {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 80px;
  /* background: rgb(175, 179, 183); */
  background: #fff;
  z-index: 1000;
}
.vm-logo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 7px 20px !important;
}

.max-width {
  width: 200px;
  transition-duration: 0.2s, 0.2s, 0.35s, 0.3s;
  -webkit-transition-duration: 0.2s, 0.2s, 0.35s, 0.3s;
  -moz-transition-duration: 0.2s, 0.2s, 0.35s, 0.3s;
  -ms-transition-duration: 0.2s, 0.2s, 0.35s, 0.3s;
}
.min-width {
  width: 80px;
  transition-duration: 0.2s, 0.2s, 0.35s, 0.3s;
  -webkit-transition-duration: 0.2s, 0.2s, 0.35s, 0.3s;
  -moz-transition-duration: 0.2s, 0.2s, 0.35s, 0.3s;
  -ms-transition-duration: 0.2s, 0.2s, 0.35s, 0.3s;
}
</style>
>
