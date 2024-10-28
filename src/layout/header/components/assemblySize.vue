<template>
  <el-dropdown trigger="click" @command="setAssmblySize">
    <span>
      <el-tooltip effect="dark" content="组件大小" placement="bottom">
        <el-icon :size="22">
          <PriceTag></PriceTag>
        </el-icon>
      </el-tooltip>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="item in assemblySizeList"
          :disabled="assemblySize === item.value"
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

interface AssemblySize {
  label: string
  value: string
}

const assemblySizeList = reactive<Array<AssemblySize>>([
  {
    label: '默认',
    value: 'default'
  },
  {
    label: '大型',
    value: 'large'
  },
  {
    label: '小型',
    value: 'small'
  }
])

const globalStore = GlobalStore()
const { assemblySize } = storeToRefs(globalStore)

const setAssmblySize = (item: AssemblySize) => {
  if (assemblySize.value === item.value) return
  globalStore.setAssemblySize(item.value)
}
</script>
<style lang="scss" scoped></style>
