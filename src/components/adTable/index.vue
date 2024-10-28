<template>
  <el-table
    :height="height"
    :data="tableData"
    class="aid-table"
    v-loading="loading"
    v-bind="{ ...$attrs }"
  >
    <el-table-column
      v-for="(item, index) in columnList"
      :key="index"
      v-bind="item"
    >
      <template #header="scope">
        <slot :name="'header-' + item.prop" :scope="scope">
          <span>{{ item.label }}</span>
        </slot>
      </template>
      <template #default="scope">
        <slot
          :name="item.prop"
          :scope="scope"
          v-if="!types.includes(item.type)"
        >
          <span>{{ scope.row[item.prop] }}</span>
        </slot>
      </template>
    </el-table-column>
    <template #empty>
      <div class="table-empty">
        <p>
          <el-image
            :src="emptyImg"
            style="width: 100%; height: 100%"
            fit="contain"
          />
        </p>
        <p>There is no content yet. Go and check the balance.</p>
      </div>
    </template>
  </el-table>
</template>

<script setup lang="ts">
import { TableProps } from './table.d'
import emptyImg from '@/assets/images/emptydata.png'

withDefaults(defineProps<TableProps>(), {
  tableData: () => [],
  columnList: () => [],
  loading: () => false,
  showBorder: true
})

const types = ['selection', 'index', 'expand']
</script>

<style lang="scss" scoped>
.aid-table {
  :deep(.el-table__header) {
    th {
      color: #43445c;
      font-weight: 700;
      background-color: #e9e9ec;
    }
  }
  :deep(.el-table__empty-text) {
    display: flex;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    justify-content: center;
  }
  .table-empty {
    width: 400px;
    max-height: 500px;
    display: flex;
    flex-direction: column;
    > p:first-child {
      height: calc(100% - 70px);
    }
    > p:last-child {
      height: 70px;
    }
  }
}
</style>
