<template>
  <template v-if="!item?.meta?.hidden">
    <template v-if="hasOneShowingChild(item.children, item)">
      <el-menu-item
        v-if="onlyOneChild.meta"
        :index="resolvePath(onlyOneChild.path)"
      >
        <el-icon v-if="onlyOneChild.meta && onlyOneChild.meta.icon">
          <component
            v-if="!onlyOneChild.meta.icon.includes('icon-')"
            :is="onlyOneChild.meta.icon"
          ></component>
          <i v-else :class="`iconfont ${onlyOneChild.meta.icon}`"></i>
        </el-icon>
        <template #title>{{ onlyOneChild.meta.title }}</template>
      </el-menu-item>
    </template>

    <el-sub-menu v-else :index="resolvePath(item.path)">
      <template #title>
        <el-icon v-if="item.meta && item.meta.icon">
          <component
            v-if="!item.meta.icon.includes('icon-')"
            :is="item.meta.icon"
          ></component>
          <i v-else :class="`iconfont ${item.meta.icon}`"></i>
        </el-icon>
        <span>{{ item.meta && item.meta.title }}</span>
      </template>

      <menu-item
        v-for="child in item.children"
        :key="child.path"
        :item="child"
        :base-path="resolvePath(child.path)"
      />
    </el-sub-menu>
  </template>
</template>

<script setup lang="ts">
import path from 'path-browserify'
import { ref } from 'vue'
import type { Ref } from 'vue'
import type { RouteData, OnlyOneChild } from './menuItem'

const props = defineProps<{
  item: RouteData
  basePath: string
}>()

const onlyOneChild: Ref<OnlyOneChild> = ref({
  path: '',
  name: ''
})
const hasOneShowingChild = (
  children: Array<RouteData> = [],
  parent: RouteData
) => {
  const showingChildren = children.filter((item) => {
    if (item?.meta?.hidden) {
      return false
    } else {
      onlyOneChild.value = item
      return true
    }
  })

  if (showingChildren.length === 1) {
    return true
  }

  if (showingChildren.length === 0) {
    onlyOneChild.value = { ...parent, path: '', noShowingChildren: true }
    return true
  }

  return false
}

const resolvePath = (routePath: string) => {
  return path.resolve(props.basePath, routePath)
}
</script>

<style lang="scss" scoped></style>
