<template>
  <div class="tabs" ref="tabRef">
    <div class="tabs-menu">
      <el-tabs
        v-model="activeTab"
        type="card"
        @tab-click="tabClick"
        @tab-remove="removeTab"
        @contextmenu.prevent="openMenu"
      >
        <el-tab-pane
          v-for="item in tabMenuList"
          :key="item.path"
          :label="item.title"
          :name="item.path"
          :closable="item.close"
        >
          <template #label>
            <el-icon class="tabs-icon" v-if="item.icon">
              <component :is="item.icon"></component>
            </el-icon>
            {{ item.title }}
          </template>
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 右键菜单 -->
    <div
      v-show="visible"
      :style="{ left: left + 'px', top: top + 'px' }"
      class="contextmenu"
    >
      <div
        class="menu__item"
        v-if="menuItemTab !== tabMenuList[0].path"
        @click="closeCurrent"
      >
        Close
      </div>
      <div class="menu__item" @click="closeRights">Close Right Side</div>
      <div class="menu__item" @click="closeOthers">Close Others</div>
      <div class="menu__item" @click="closeAll">Close All</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { TabsStore } from '@/store/modules/tabs'
import type { TabsPaneContext, TabPaneName } from 'element-plus'

const tabStore = TabsStore()
const tabMenuList = computed(() => tabStore.tabsMenuList)

const activeTab = computed({
  get: () => {
    return tabStore.tabsMenuValue
  },
  set: (val) => {
    tabStore.setTabsMenuValue(val)
  }
})

// 监听路由，添加标签 && 监听路由的变化（防止浏览器后退/前进不变化 tabsMenuValue）
const route = useRoute()
const router = useRouter()
watch(
  () => route.path,
  () => {
    const params = {
      title: route.name as string,
      path: route.path,
      close: true
    }
    tabStore.addTabs(params)
  },
  {
    immediate: true
  }
)
const tabClick = (pane: TabsPaneContext) => {
  const path = pane.props.name as string
  router.push(path)
}

const removeTab = (name: TabPaneName) => {
  tabStore.removeTabs(name as string)
}
/* 右键菜单 */
const visible = ref(false)
const tabRef = ref()
const top = ref(0)
const left = ref(0)
const menuItemTab = ref('')

watch(visible, (value) => {
  if (value) {
    document.body.addEventListener('click', closeMenu)
  } else {
    document.body.addEventListener('click', closeMenu)
  }
})

const openMenu = (event: MouseEvent) => {
  // let path = ''
  // if ((event.target as HTMLElement).id) {
  //   path = (event.target as HTMLElement).id
  // } else if ((event.target as HTMLElement).nodeName === 'path') {
  //   path = ((event.target as any).parentNode.parentNode.parentNode as any ).id
  // }
  const path = (event.target as HTMLElement).id
  if (path !== '') {
    const menuMinWidth = 105
    const offsetLeft = tabRef.value.getBoundingClientRect().left // container margin left
    const offsetWidth = tabRef.value.offsetWidth // container width
    const maxLeft = offsetWidth - menuMinWidth // left boundary

    const eventLeft = event.clientX - offsetLeft
    if (eventLeft > maxLeft) {
      left.value = maxLeft
    } else {
      left.value = eventLeft
    }
    top.value = (event.target as HTMLElement).getBoundingClientRect().height
    const routePath = path.substring(4)
    menuItemTab.value = routePath
    visible.value = true
  }
}

const closeCurrent = () => {
  tabStore.removeTabs(menuItemTab.value)
}
const closeRights = () => {
  tabStore.removeRightTabs(menuItemTab.value)
}
const closeOthers = () => {
  tabStore.removeOtherTabs(menuItemTab.value)
}
const closeAll = () => {
  tabStore.closeAll()
}

const closeMenu = () => {
  visible.value = false
  menuItemTab.value = ''
}
</script>

<style lang="scss" scoped>
:deep(.tabs-menu) {
  .tabs-icon {
    // top: 2px;
    // margin-rigth: 5px;
    font-size: 18px;
    right: 3px;
  }
  .el-tabs--card > .el-tabs__header {
    box-sizing: border-box;
    height: 40px;
    padding: 0 10px;
    margin: 0;
  }
  .el-tabs--card > .el-tabs__header .el-tabs__nav {
    border: none;
  }
  .el-tabs--card > .el-tabs__header .el-tabs__item {
    color: #cccccc;
    border: none;
  }
  .el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
    color: $primary-color;
    border-bottom: 2px solid $primary-color;
  }
  .el-tabs__item .is-icon-close svg {
    margin-top: 0.5px;
  }
}
.tabs {
  width: 100%;
  height: 40px;
  box-sizing: border-box;
  position: relative;
}

.tabs-menu {
  width: 100%;
  height: 100%;
}

.contextmenu {
  position: absolute;
  color: #000;
  background: #fff;
  z-index: 3000;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
  .menu__item {
    margin: 0;
    padding: 7px 16px;
    cursor: pointer;
    &:hover {
      background: #eee;
    }
  }
}
</style>
