export const viteProxyConfig = (mode: string) => {
  const proxyPaths = ['/api', '/goodsapi', '/podapi'] // 定义需要代理的路径
  const target =
    mode === 'development' || mode === 'test'
      ? 'http://udshop-test.hzpdex.com'
      : 'https://product.usadrop.com'

  // 使用数组的map方法构建代理配置对象
  return proxyPaths.reduce((config: any, path) => {
    config[path] = {
      target: target,
      changeOrigin: true
      // rewrite: (path) => {
      //   return path.replace(/^\/config[path]/, '')
      // }
    }
    return config
  }, {})
}
