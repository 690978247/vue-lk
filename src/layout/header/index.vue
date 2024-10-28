<template>
  <div class="header">
    <div class="header-lf">
      <el-icon :size="22" class="collapse-icon" @click="toggleCollapse">
        <component :is="isCollapse ? 'expand' : 'fold'" />
      </el-icon>

      <div class="breadcrumb" v-if="settingConfig.breadcrumb">
        <el-breadcrumb separator="/">
          <!-- <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item> -->
          <el-breadcrumb-item
            v-for="item in matched"
            :key="item.path"
            :to="{ path: item.redirect ? '' : item.path }"
          >
            {{ item.name }}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>

    <div class="header-ri">
      <div class="header-icons">
        <ExternalLink />
        <assemblySize />
        <Language />
        <Setting />
        <FullScreen />
      </div>
      <div class="avatar">
        <el-dropdown trigger="click" @command="setDrop">
          <span>
            <img src="@/assets/images/avatar.png" alt="avatar" />
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                v-for="item in dropList"
                :key="item.value"
                :command="item"
              >
                {{ item.label }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { MenuStore } from '@/store/modules/menu'
import { GlobalStore } from '@/store/modules/global'
import { TabsStore } from '@/store/modules/tabs'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Setting from './components/setting.vue'
import FullScreen from './components/fullScreen.vue'
import Language from './components/language.vue'
import assemblySize from './components/assemblySize.vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import ExternalLink from './components/externalLink.vue'

const menuStore = MenuStore()
const globalStore = GlobalStore()
const tabsStore = TabsStore()
const route = useRoute()
const router = useRouter()

const { isCollapse } = storeToRefs(menuStore)
const settingConfig = storeToRefs(globalStore).settingConfig

const toggleCollapse = () => {
  const menu = MenuStore()
  menu.setCollpase()
}
const matched = computed(() =>
  route.matched.filter(
    (item) => item.meta && item.meta.title && item.meta.title !== '首页'
  )
)

interface DropList {
  label: string
  value: string
}

const dropList: Array<DropList> = [
  {
    label: 'Logout',
    value: '退出登录'
  }
]
const setDrop = (opt: DropList) => {
  if (opt.value === '退出登录') {
    ElMessageBox.confirm('您是否确认退出系统？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      tabsStore.closeAll()
      router.push({ name: 'login' })
      ElMessage({
        type: 'success',
        message: '退出登录成功！'
      })
    })
  }
}
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  height: 55px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  color: #000;
  border-bottom: 1px solid #e4e7ed;
  box-sizing: border-box;
}
.header-lf {
  display: flex;
  align-items: center;
}
.header-ri {
  margin: 0 35px;
  display: flex;
  align-items: center;
  height: 100%;
  .header-icons {
    display: flex;
    justify-content: center;
    margin-right: 25px;
    height: 100%;
    > div {
      display: flex;
      align-items: center;
      cursor: pointer;
      & + div {
        margin-left: 20px;
      }
    }
  }
}

.collapse-icon {
  margin-right: 10px;
  cursor: pointer;
}

.avatar {
  width: 40px;
  height: 40px;
  overflow: hidden;
  cursor: pointer;
  border-radius: 50%;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
