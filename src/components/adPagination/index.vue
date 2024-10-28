<template>
  <div class="aid-pagination">
    <!-- 根据需要添加额外的样式或布局 -->
    <el-pagination
      v-model:current-page="_currentPage"
      :page-size="_pageSize"
      :total="_total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :layout="layout"
      :prev-text="prevText"
      :next-text="nextText"
      :hide-on-single-page="hideOnSinglePage"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
const emit = defineEmits(['size-change', 'current-change'])
// 定义props并转换为ref以便于在模板中使用
const props = defineProps({
  currentPage: {
    type: Number,
    default: 1
  },
  pageSize: {
    type: Number,
    default: 10
  },
  total: {
    type: Number,
    required: true
  },
  layout: {
    type: String,
    default: 'prev, pager, next,total, sizes, jumper'
  },
  prevText: {
    type: String,
    default: ''
  },
  nextText: {
    type: String,
    default: ''
  },
  hideOnSinglePage: {
    type: Boolean,
    default: false
  }
  // 添加更多你需要封装的props
})

// 提供默认值或计算属性
const _currentPage = computed(() => props.currentPage)
const _pageSize = computed(() => props.pageSize)
const _total = computed(() => props.total)

// 处理分页大小改变事件
const handleSizeChange = (newPageSize: number) => {
  emitFn('size-change', newPageSize)
}

// 处理当前页码改变事件
const handleCurrentChange = (newCurrentPage: number) => {
  // _currentPage.value = newCurrentPage
  emitFn('current-change', newCurrentPage)
}

// 在这里你可以根据需要添加更多的逻辑处理、数据请求等

// 使用setup语法糖emit函数触发父组件的事件
function emitFn(eventName: any, ...args: any[]) {
  return emit(eventName, ...args)
}
</script>
<style lang="scss" scoped>
$borderColor: #686a7d;
.aid-pagination {
  width: 100%;
  min-height: 64px;
  border: none;
  border-radius: 0 0 16px 16px;
  padding-right: inherit;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-family: Abril Fatface !important;
  background-color: #fff;
  :deep(.el-pager li) {
    border: 1.5px solid $borderColor;
    font-family: Abril Fatface;
    border-radius: 6px;
    // font-size: 16px;
    margin-right: 8px;
    &:hover {
      border-color: var(--el-pagination-hover-color);
    }
    &.is-active {
      border-color: var(--el-pagination-hover-color);
    }
  }
  :deep(button) {
    border: 1.5px solid var(--el-pagination-hover-color);
    margin-right: 8px;
    border-radius: 6px;
    color: var(--el-pagination-hover-color);
    &:disabled {
      border-color: var(--el-pagination-button-disabled-color);
      color: var(--el-pagination-button-disabled-color) !important;
    }
    .el-icon {
      font-size: 18px;
    }
  }
  :deep(.el-pagination__sizes) {
    border: none;
    border: 1.5px solid $borderColor;
    border-radius: 6px;
    padding: 0 2px;
    .el-select__wrapper {
      box-shadow: none;
      .el-select__caret {
        color: $borderColor;
      }
    }
  }
  :deep(.is-in-pagination) {
    border: 1.5px solid $borderColor;
    border-radius: 6px;
    padding: 0 2px;
    .el-input__wrapper {
      box-shadow: none;
    }
  }
}
</style>
