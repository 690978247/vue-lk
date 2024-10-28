import axios from 'axios'
import { ElMessage } from 'element-plus'

const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 5000
})

/**
 * @description 请求拦截器
 */
// const globalStore = GlobalStore()
service.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

/**
 * @description 响应拦截器
 */
service.interceptors.response.use(
  (response) => {
    const res = response.data
    if (res instanceof Blob) {
      // 流文件
      return res
    }
    if (res.code !== 200 && response.config?.headers?.hideMsg !== 'true') {
      ElMessage({
        message: res.msg || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      return res
    }
  },
  (error) => {
    ElMessage({
      message: 'The service is unavailable',
      type: 'error',
      duration: 2 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
