<template>
  <div id="view">
    <el-config-provider :locale="i18nLocale" :size="assemblySize">
      <RouterView />
    </el-config-provider>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterView } from 'vue-router'
import { GlobalStore } from '@/store/modules/global'
import { storeToRefs } from 'pinia'
// 配置element中英文
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/en'
// 使用主题
import { useTheme } from '@/hooks/useTheme'
// useTheme()

const globalStore = GlobalStore()
const { assemblySize, language } = storeToRefs(globalStore)
// element 语言配置
const i18nLocale = computed(() => {
  if (language.value && language.value === 'zh') return zhCn
  return en
})
</script>

<style scoped>
#view {
  width: 100%;
  height: 100%;
}
</style>
