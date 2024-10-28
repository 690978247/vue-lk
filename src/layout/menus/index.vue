<template>
  <div class="menu" :style="{ width: isCollapse ? '65px' : '220px' }">
    <div class="logo">
      <template v-if="!isCollapse">
        <img src="@/assets/images/logo.png" alt="avatar" />
      </template>
      <template v-else="isCollapse">
        <span style="color: #ffffff">USA</span>
      </template>
    </div>
    <el-menu
      :default-active="route.path"
      background-color="#15104b"
      :default-openeds="defaultOpens"
      :collapse="isCollapse"
      text-color="#fff"
      active-text-color="#3F6AFF"
      popper-class="side-menu"
      router
    >
      <menu-item
        v-for="route in menus"
        :key="route.path"
        :item="route"
        :base-path="route.path"
      />
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { MenuStore } from '@/store/modules/menu'
import menuItem from './menuItem.vue'

const router = useRouter()
const menuStore = MenuStore()

const route = computed(() => router.currentRoute.value)
const menus: any = computed(() => router.options.routes)

const { isCollapse } = storeToRefs(menuStore)

const defaultOpens = ref(['/wallet', '/facebook'])
</script>

<style lang="scss" scoped>
.el-menu {
  border-right: none;
  background-color: #15104b;
  :deep(.el-menu-item.is-active) {
    // background: #000;
    background-color: transparent;
    &::before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      width: 3px;
      background: $primary-color;
    }
  }
  :deep(.el-menu-item:hover) {
    background-color: transparent;
    color: #3f6aff;
  }
  :deep(.el-sub-menu__title:hover) {
    background-color: transparent;
    color: #3f6aff;
  }
}

.menu {
  box-sizing: border-box;
  height: 100%;
  background-color: #15104b;
  transition: all 0.3s ease;
}

.logo {
  height: 70px;
  display: flex;
  width: 100%;
  font-weight: bold;
  font-size: 18px;
  justify-content: center;
  background: #15104b;
  box-sizing: border-box;
  overflow: hidden;
  align-items: center;
  padding: 5px 15px;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    width: 80%;
    height: 2px;
    bottom: 0;
    background-color: #28235b;
  }
}
</style>
