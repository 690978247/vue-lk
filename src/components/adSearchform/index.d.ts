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
  multiple?: boolean
  maxlength?: number
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
