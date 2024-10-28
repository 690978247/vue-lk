<template>
  <el-container>
    <el-aside>
      <Menu />
    </el-aside>
    <el-container>
      <el-header>
        <Header />
        <Tabs v-if="settingConfig.tabs" />
      </el-header>
      <el-main>
        <RouterView />
      </el-main>
      <el-footer class="container-footer" v-if="settingConfig.footer">
        <Footer />
      </el-footer>
      <el-backtop target=".el-main" :right="80" :bottom="80" />
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { GlobalStore } from '@/store/modules/global'
import { RouterView } from 'vue-router'
import { storeToRefs } from 'pinia'
import Menu from './menus/index.vue'
import Header from './header/index.vue'
import Tabs from './tabs/index.vue'
import Footer from './footer/index.vue'

const globalStore = GlobalStore()
const settingConfig = storeToRefs(globalStore).settingConfig
</script>

<style lang="scss" scoped>
.el-container {
  width: 100%;
  min-width: 970px;
  height: 100%;
  .el-aside {
    width: auto;
    overflow: inherit;
  }
  .el-header,
  .el-footer {
    height: auto;
    padding: 0;
  }
  .el-main {
    box-sizing: border-box;
    // padding: 10px 12px;
    padding: 24px;
    overflow-x: hidden;
    background: #f0f2f5;
    &::-webkit-scrollbar {
      background-color: #f0f2f5;
    }
  }
  .container-footer {
    height: 30px;
    background: #ffffff;
    border-top: 1px solid #e4e7ed;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
:deep(.el-backtop__icon) {
  color: #fa4756;
}
</style>
