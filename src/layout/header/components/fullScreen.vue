<template>
  <div>
    <el-tooltip
      effect="dark"
      :content="isFullscreen ? '退出全屏' : '全屏'"
      placement="bottom"
    >
      <el-icon :size="22" @click="toggle">
        <component :is="isFullscreen ? 'CircleCloseFilled' : 'FullScreen'" />
      </el-icon>
    </el-tooltip>
  </div>
</template>

<script setup lang="ts">
import { useFullscreen } from '@vueuse/core'
const { toggle, isFullscreen } = useFullscreen()
</script>
<style lang="scss" scoped></style>
