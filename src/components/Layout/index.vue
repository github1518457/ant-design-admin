<template>
  <div>
    <vm-sider :isMarginLeft="isMarginLeft"></vm-sider>
    <div class="vm-container" :class="[isMarginLeft ? 'max-left' : 'min-left']">
      <vm-header @handleCollapsed="handleCollapsed"></vm-header>
      <main class="vm-main">
        <div class="vm-view">
          <router-view></router-view>
        </div>
      </main>
    </div>
  </div>
</template>
<script>
import VmHeader from '../Header';
import VmSider from '../Sider';

export default {
  components: { VmSider, VmHeader },
  data() {
    return {
      isMarginLeft: false
    };
  },
  methods: {
    handleCollapsed(val) {
      this.isMarginLeft = val;
    }
  }
};
</script>
<style scoped>
.vm-container {
  overflow: hidden;
  /* position: relative; */
  /* display: flex; */
  /* height: 100vh; */
}
.vm-main {
  padding: 12px 12px 30px 12px;
  margin-top: 64px;
  min-height: calc(100vh - 64px);
  /* height: 10vh; */
  /* flex: auto;
  min-height: 0; */
  /* min-height: 0;
  position: relative;
  box-sizing: border-box;
  display: block; */
  /* height: 100vh; */
}
.max-left {
  margin-left: 200px;
  transition-duration: 0.2s, 0.2s, 0.35s, 0.3s;
  -webkit-transition-duration: 0.2s, 0.2s, 0.35s, 0.3s;
  -moz-transition-duration: 0.2s, 0.2s, 0.35s, 0.3s;
  -ms-transition-duration: 0.2s, 0.2s, 0.35s, 0.3s;
}
.min-left {
  margin-left: 80px;
  transition-duration: 0.2s, 0.2s, 0.35s, 0.3s;
  -webkit-transition-duration: 0.2s, 0.2s, 0.35s, 0.3s;
  -moz-transition-duration: 0.2s, 0.2s, 0.35s, 0.3s;
  -ms-transition-duration: 0.2s, 0.2s, 0.35s, 0.3s;
}
</style>
