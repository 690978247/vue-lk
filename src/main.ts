import { createApp } from 'vue'
import App from './App.vue'
import router from './utils'
import './utils/rem'

import '@/styles/main.scss'
import '@/styles/tailwind.css'
// 统一导入 element 图标
import * as Icons from '@element-plus/icons-vue'
// 引入element样式
// import 'element-plus/dist/index.css'
/* 如果使用 unplugin-element-plus 并且只使用组件 API，你需要手动导入样式  */
// import 'element-plus/es/components/message/style/css'
// import 'element-plus/es/components/message-box/style/css'
// 使用pinai store
import pinia from '@/store/index'
/* 引入iconfont */
import '@/assets/iconfont/iconfont.css'
import '@/assets/iconfont/iconfont.js'
// 使用国际化 vue-i18n
import I18n from '@/language/index'

const app = createApp(App)

// 注册全局 element-icons 组件
Object.keys(Icons).forEach((key) => {
  app.component(key, Icons[key as keyof typeof Icons])
})

app.use(router).use(pinia).use(I18n)

app.mount('#app')
