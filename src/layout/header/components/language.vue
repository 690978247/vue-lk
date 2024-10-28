<template>
  <el-dropdown trigger="click" @command="setLanguage">
    <span>
      <el-tooltip effect="dark" content="国际化" placement="bottom">
        <el-icon :size="22">
          <CollectionTag></CollectionTag>
        </el-icon>
      </el-tooltip>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="item in languageList"
          :disabled="language === item.value"
          :key="item"
          :command="item"
        >
          {{ item.label }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { storeToRefs } from 'pinia'
import { GlobalStore } from '@/store/modules/global'
import { useI18n } from 'vue-i18n'

interface Language {
  label: string
  value: string
}

const languageList = reactive<Array<Language>>([
  {
    label: '简体中文',
    value: 'zh'
  },
  {
    label: 'English',
    value: 'en'
  }
])

const globalStore = GlobalStore()
const { language } = storeToRefs(globalStore)
const { locale } = useI18n()

const setLanguage = (item: Language) => {
  if (language.value === item.value) return
  globalStore.setLanguage(item.value)
  locale.value = item.value
}
</script>
<style lang="scss" scoped></style>
