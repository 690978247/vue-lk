import router from '@/router/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { UseSearch } from './common'

NProgress.configure({
  easing: 'ease', // 动画方式
  speed: 500, // 递增进度条的速度
  showSpinner: true, // 是否显示加载ico
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3 // 初始化时的最小百分比
})

/**
 * @description 路由拦截 beforeEach
 * */

router.beforeEach((to, from, next) => {
  NProgress.start()
  // 外链
  const externalLink = !!to.meta.link
  if (externalLink) {
    NProgress.done()
    window.open(to.meta.link as string)
    return
  } else {
    next()
  }
})

router.afterEach(() => {
  NProgress.done()
})

export default router
