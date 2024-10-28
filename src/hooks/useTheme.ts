import { ElMessage } from 'element-plus'
import { GlobalStore } from '@/store/modules/global'
import { storeToRefs } from 'pinia'
import { onBeforeMount } from 'vue'
import { DEFAULT_PRIMARY } from '@/config/config'

export const useTheme = () => {
  const globalStore = GlobalStore()
  const settingConfig = storeToRefs(globalStore).settingConfig

  // 修改主题颜色
  const changePrimary = (val: string) => {
    if (!val) {
      val = DEFAULT_PRIMARY
      ElMessage({
        type: 'success',
        message: `主题颜色已重置为${DEFAULT_PRIMARY}`
      })
    }
    globalStore.setSettingConfig({ ...settingConfig.value, primary: val })
    document.documentElement.style.setProperty(
      '--el-color-primary',
      settingConfig.value.primary
    )
  }

  onBeforeMount(() => {
    // changePrimary(settingConfig.value.primary)
  })

  return {
    changePrimary
  }
}
