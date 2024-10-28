import type { FormRules } from 'element-plus'
export interface FormItemOption {
  value: string
  label: string
}

export interface FormItem {
  type: string
  prop: string
  label?: string
  span?: number
  disabled?: boolean
  showPassword?: boolean
  placeholder?: string
  slotName?: string
  options?: Array<FormItemOption>
  defaultTime?: string
  labelWidth: string
  size: 'large' | 'default' | 'small'
  /* 上传 */
  action?: string
  multiple?: boolean
  fileList?: Array<any>
  limit?: number
  listType?: 'text' | 'picture' | 'picture-card'
}

export interface FormData {
  [propName: string]: string
}

export interface Props {
  data: FormData
  formItem: Array<FormItem>
  rules?: FormRules
  labelPosition?: string
  labelWidth?: string
}
