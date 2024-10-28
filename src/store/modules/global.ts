import { defineStore } from 'pinia'
import { DEFAULT_PRIMARY } from '@/config/config'
interface SettingConfigProp {
  primary: string
  breadcrumb: boolean
  tabs: boolean
  footer: boolean
}
export const GlobalStore = defineStore('global', {
  state: () => ({
    // language
    language: 'en',
    // element组件大小
    assemblySize: 'default',
    // 全局设置
    settingConfig: {
      // 默认 primary 主题颜色
      primary: DEFAULT_PRIMARY,
      // 面包屑导航
      breadcrumb: true,
      // 标签页
      tabs: true,
      // 页脚
      footer: false
    }
  }),
  getters: {},
  actions: {
    setSettingConfig(settingConfig: SettingConfigProp) {
      this.settingConfig = settingConfig
    },
    setAssemblySize(value: string) {
      this.assemblySize = value
    },
    setLanguage(value: string) {
      this.language = value
    }
  }
})
