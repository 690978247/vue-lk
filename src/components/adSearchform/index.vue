<template>
  <div class="search-form">
    <el-form
      ref="searchformRef"
      :model="formData"
      v-bind="{ ...$attrs }"
      :label-width="labelWidth"
      :label-position="labelPosition"
    >
      <el-row :gutter="20">
        <el-col
          :span="item.span || 5"
          v-for="item in formItem"
          :key="item.prop"
        >
          <template v-if="item.type === 'input'">
            <el-form-item
              :label="item.label"
              :prop="item.prop"
              :label-width="item.labelWidth"
            >
              <el-input
                :disabled="item.disabled"
                :size="item.size"
                :maxlength="item.maxlength || 300"
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
                clearable
                :multiple="item.multiple"
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
                :placeholder="
                  item.placeholder ? item.placeholder : '请选择日期'
                "
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
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                range-separator="-"
                :default-time="item.defaultTime"
                format="YYYY-MM-DD HH:mm:ss"
                value-format="YYYY-MM-DD HH:mm:ss"
                type="datetimerange"
              >
              </el-date-picker>
            </el-form-item>
          </template>
        </el-col>

        <div class="footer">
          <el-button
            class="search-footer-btn btn-white"
            color="#00CDC1"
            @click="searchData"
            >查 询</el-button
          >
          <slot name="footer-btn"> </slot>
        </div>
      </el-row>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { Props } from './index.d'

const searchformRef = ref(null)

const emits = defineEmits(['search'])

const props = withDefaults(defineProps<Props>(), {
  data: () => {
    return {}
  },
  labelWidth: '80px',
  labelPosition: 'left',
  formItem: () => {
    return []
  }
})

const formData = computed(() => props.data)

const searchData = () => {
  emits('search', formData.value)
}
</script>

<style lang="scss" scoped>
.search-form {
  width: 100%;
  box-sizing: border-box;
}

.footer {
  width: 200px;
  height: 100%;
  margin-left: 24px;
  .btn-white {
    color: #fff;
  }
}
</style>
