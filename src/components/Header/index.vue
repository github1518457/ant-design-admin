<template>
  <header class="header" :class="[collapsed ? 'max-pos-left' : 'min-pos-left']">
    <a-row type="flex" justify="start">
      <a-col :span="4">
        <span class="vm-icon" @click="handleIcon">
          <a-icon v-if="collapsed" type="more" class="vm-style-icon" />
          <a-icon v-else type="unordered-list" class="vm-style-icon" />
        </span>
      </a-col>
      <a-col :span="4">
        <router-link to="/home">
          <span>首页</span>
        </router-link>
      </a-col>
      <a-col :span="4"> col-4 </a-col>
      <a-col :span="4"> col-4 </a-col>
      <a-col :span="4"> col-4 </a-col>
      <a-col :span="4"> col-4 </a-col>
    </a-row>
  </header>
</template>
<script>
export default {
  props: {
    isMarginLeft: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      collapsed: false
    };
  },
  methods: {
    handleIcon() {
      // console.log(111);
      this.collapsed = !this.collapsed;
      this.$emit('handleCollapsed', this.collapsed);
      // this.isIconFont = !this.isIconFont;
      // this.$emit('handleIconFont', this.isIconFont);
    }
  }
};
</script>
<style scoped>
.header {
  background-color: #001529;
  /* background-color: #fff; */
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 80px;
  width: 100%;
  z-index: 999;
  height: 64px;
  padding: 0 50px;
  line-height: 64px;
}
.max-pos-left {
  left: 200px;
  transition-duration: 0.2s, 0.2s, 0.35s, 0.3s;
  -webkit-transition-duration: 0.2s, 0.2s, 0.35s, 0.3s;
  -moz-transition-duration: 0.2s, 0.2s, 0.35s, 0.3s;
  -ms-transition-duration: 0.2s, 0.2s, 0.35s, 0.3s;
}
.min-pos-left {
  left: 80px;
  transition-duration: 0.2s, 0.2s, 0.35s, 0.3s;
  -webkit-transition-duration: 0.2s, 0.2s, 0.35s, 0.3s;
  -moz-transition-duration: 0.2s, 0.2s, 0.35s, 0.3s;
  -ms-transition-duration: 0.2s, 0.2s, 0.35s, 0.3s;
}
.vm-icon {
  display: inline-block;
  padding: 2px !important;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  background: #ccc;
}
.vm-style-icon {
  font-size: 16px;
  color: #fff;
  cursor: pointer;
}
</style>
