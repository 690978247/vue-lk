<template>
  <div>
    <el-tooltip effect="dark" content="全局设置" placement="bottom">
      <el-icon :size="22" @click="openSetting">
        <Setting />
      </el-icon>
    </el-tooltip>

    <el-drawer v-model="drawerVisible" title="布局设置" size="300px">
      <el-divider class="divider" content-position="center">
        <el-icon><ColdDrink /></el-icon>
        全局主题
      </el-divider>
      <div class="theme-item">
        <span>主题颜色</span>
        <el-color-picker
          v-model="settingConfig.primary"
          @change="changePrimary"
        />
      </div>
      <!-- <div class="theme-item">
				<span>暗黑模式</span>
				<SwitchDark></SwitchDark>
			</div>
			<div class="theme-item">
				<span>灰色模式</span>
				<el-switch />
			</div>
			<div class="theme-item">
				<span>色弱模式</span>
				<el-switch />
			</div> -->
      <br />
      <el-divider class="divider" content-position="center">
        <el-icon><Setting /></el-icon>
        界面设置
      </el-divider>
      <div class="theme-item">
        <span>折叠菜单</span>
        <el-switch v-model="menuStore.isCollapse" />
      </div>
      <div class="theme-item">
        <span>面包屑导航</span>
        <el-switch v-model="settingConfig.breadcrumb" />
      </div>
      <div class="theme-item">
        <span>标签栏</span>
        <el-switch v-model="settingConfig.tabs" />
      </div>
      <div class="theme-item">
        <span>页脚</span>
        <el-switch v-model="settingConfig.footer" />
      </div>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { GlobalStore } from '@/store/modules/global'
import { MenuStore } from '@/store/modules/menu'
import { useTheme } from '@/hooks/useTheme'

const globalStore = GlobalStore()
const menuStore = MenuStore()
const settingConfig = storeToRefs(globalStore).settingConfig

/* 打开抽屉 */
const drawerVisible = ref(false)
const openSetting = () => {
  drawerVisible.value = true
}

/* 修改主题色 */
const { changePrimary } = useTheme()
</script>

<style lang="scss" scoped>
.theme-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 15px 0;
  span {
    font-size: 14px;
  }
}
</style>
