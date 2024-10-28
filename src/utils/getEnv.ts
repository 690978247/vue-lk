type Recordable<T = any> = Record<string, T>

export interface ViteEnv {
  VITE_BASE_URL: string
  VITE_PORT: number
  VITE_OPEN: boolean
  VITE_DROP_CONSOLE: boolean
}

// 环境变量  process
export function wrapperEnv(envConf: Recordable): ViteEnv {
  /* 设置默认值 */
  const ret: any = {
    VITE_BASE_URL: '',
    VITE_PORT: 8000,
    VITE_OPEN: false,
    VITE_DROP_CONSOLE: true
  }
  for (const envName of Object.keys(envConf)) {
    let realValue = envConf[envName]
    // let realValue = envConf[envName].replace(/\\n/g, '\n')
    realValue =
      realValue === 'true' ? true : realValue === 'false' ? false : realValue

    if (envName === 'VITE_PORT') {
      realValue = Number(realValue)
    }

    ret[envName] = realValue
    // tsconfig.json 添加types[{ "node" }]
    process.env[envName] = realValue
  }
  return ret
}
