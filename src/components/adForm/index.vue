<template>
  <el-form
    ref="formRef"
    :model="formData"
    :rules="rules"
    :label-position="labelPosition"
    :label-width="labelWidth"
    label-suffix=":"
    class="common_form"
  >
    <el-row :gutter="20">
      <el-col
        v-for="(item, index) in formItem"
        :span="item.span ? item.span : 24"
        :key="index"
      >
        <template v-if="item.type === 'input'">
          <el-form-item
            :label="item.label"
            :prop="item.prop"
            :label-width="item.labelWidth"
          >
            <el-input
              :disabled="item.disabled"
              @blur="handleBlur($event, item)"
              :size="item.size"
              clearable
              :show-password="item.showPassword"
              :placeholder="item.placeholder ? item.placeholder : '请输入'"
              v-model="formData[item.prop]"
            >
              <template :v-slot="item.slotName">
                <slot
                  :name="item.prop"
                  :scope="item"
                  :formData="formData"
                ></slot>
              </template>
            </el-input>
          </el-form-item>
        </template>

        <template v-if="item.type === 'select'">
          <el-form-item
            :label="item.label"
            :prop="item.prop"
            :label-width="item.labelWidth"
          >
            <el-select
              v-model="formData[item.prop]"
              @change="handleChange($event, item)"
              :multiple="item.multiple"
              class="common_select"
              :size="item.size"
              :placeholder="item.placeholder ? item.placeholder : '请选择'"
            >
              <el-option
                v-for="opt in item.options"
                :key="opt.value"
                :label="opt.label"
                :value="opt.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </template>

        <template v-if="item.type === 'date'">
          <el-form-item
            :label="item.label"
            :prop="item.prop"
            :label-width="item.labelWidth"
          >
            <el-date-picker
              class="form-date"
              :size="item.size"
              v-model="formData[item.prop]"
              value-format="YYYY-MM-DD HH:mm:ss"
              type="date"
              :placeholder="item.placeholder ? item.placeholder : ''"
            >
            </el-date-picker>
          </el-form-item>
        </template>

        <template v-if="item.type === 'date-time'">
          <el-form-item
            :label="item.label"
            :prop="item.prop"
            :label-width="item.labelWidth"
          >
            <el-date-picker
              class="form-date"
              :size="item.size"
              v-model="formData[item.prop]"
              value-format="YYYY-MM-DD HH:mm:ss"
              :default-time="item.defaultTime"
              type="datetime"
              :placeholder="item.placeholder ? item.placeholder : '请选择日期'"
            >
            </el-date-picker>
          </el-form-item>
        </template>

        <template v-if="item.type === 'range-date'">
          <el-form-item
            :label="item.label"
            :prop="item.prop"
            :label-width="item.labelWidth"
          >
            <el-date-picker
              class="form-date"
              :size="item.size"
              v-model="formData[item.prop]"
              start-placeholder=" "
              end-placeholder=" "
              range-separator="To"
              format="YYYY-MM-DD HH:mm:ss"
              value-format="YYYY-MM-DD HH:mm:ss"
              type="datetimerange"
            >
            </el-date-picker>
          </el-form-item>
        </template>

        <!-- 上传 -->
        <template v-if="item.type === 'upload'">
          <el-form-item
            :label="item.label"
            :prop="item.prop"
            :label-width="item.labelWidth"
          >
            <adUpload
              :action="item.action"
              :limit="item.limit || 1"
              :multiple="item.multiple || false"
              :list-type="item.listType || 'picture-card'"
              v-model:file-list="formData[item.prop]"
              v-bind="{ ...item }"
            />
          </el-form-item>
        </template>

        <!-- switch -->
        <template v-if="item.type === 'switch'">
          <el-form-item
            :label="item.label"
            :prop="item.prop"
            :label-width="item.labelWidth"
          >
            <el-switch v-model="formData[item.prop]" />
          </el-form-item>
        </template>

        <!-- radio -->
        <template v-if="item.type === 'radio'">
          <el-form-item
            :label="item.label"
            :prop="item.prop"
            :label-width="item.labelWidth"
          >
            <el-radio-group v-model="formData[item.prop]">
              <el-radio
                v-for="opt in item.options"
                :key="opt.value"
                :value="opt.value"
                >{{ opt.label }}</el-radio
              >
            </el-radio-group>
          </el-form-item>
        </template>
      </el-col>
    </el-row>
  </el-form>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { FormItem, Props } from './form.d'
import adUpload from '@/components/adUpload/index.vue'

// 注意 defineProps的ts类型 vue3.3版本以下不能从外部导入
// interface Props {
//   data: FormData
//   formItem: Array<FormItem>
//   rules?: FormRules
//   labelPosition?: string
//   labelWidth?: string
// }

const props = withDefaults(defineProps<Props>(), {
  data: () => {
    return {}
  },
  rules: () => {
    return {}
  },
  labelPosition: 'left',
  labelWidth: '100px',
  formItem: () => {
    return []
  }
})

// emits
const emits = defineEmits(['blur', 'change'])
const formData = computed(() => props.data)

const formRef = ref()
defineExpose({ formRef })

const handleBlur = (event: FocusEvent, item: FormItem) => {
  emits('blur', event, item)
}

const handleChange = (event: MouseEvent, item: FormItem) => {
  emits('change', event, item)
}
</script>

<style lang="scss" scoped>
::v-deep(.el-input) {
  .el-input-group__append,
  .el-input-group__prepend {
    cursor: pointer;
    padding: 0;
  }
}

::v-deep(.common_select.el-select) {
  width: 100%;
}

.common_form {
  width: 100%;
  height: 100%;
  .el-form-item {
    align-items: center;
  }
}

.form-date {
  width: 100%;
}
</style>
