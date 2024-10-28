<template>
  <div>
    <Table :tableData="tableData" :columnList="columnList" />
  </div>
</template>

<script setup lang="ts">
import Table from '@/components/adTable/index.vue'

const tableData = [
  {
    ProductId: '001',
    ProductionDateTime: new Date(),
    Shift: 1,
    Operator: '003',
    Passed: true
  }
]
const columnList = [
  {
    label: '产品编号',
    prop: 'ProductId',
    width: '130px'
  },
  {
    label: '生产时间',
    prop: 'ProductionDateTime',
    sortable: true
  },
  {
    label: '班次',
    prop: 'Shift'
  },
  {
    label: '操作员',
    prop: 'Operator'
  },
  {
    label: '检测结果',
    prop: 'Passed'
  },
  {
    label: '操作',
    prop: 'Operation'
  }
]
</script>

<style lang="scss" scoped></style>
