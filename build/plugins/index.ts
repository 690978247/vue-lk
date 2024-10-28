import type { PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { visualizer } from 'rollup-plugin-visualizer'
import viteCompression from 'vite-plugin-compression'
import { viteMockServe } from 'vite-plugin-mock'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { ViteEnv } from '../../src/utils/getEnv'
import ElementPlus from 'unplugin-element-plus/vite'

export function setupVitePlugins(viteEnv: ViteEnv) {
  const plugins: PluginOption = [
    vue({
      script: {
        defineModel: true
      }
    }),
    vueJsx(),
    ElementPlus({
      useSource: true
    }),
    AutoImport({
      imports: ['vue'],
      dts: 'types/auto-imports.d.ts',
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    }),
    visualizer({
      gzipSize: true,
      brotliSize: true,
      emitFile: false,
      filename: 'report.html', // 分析图生成的文件名
      open: true // 如果存在本地服务端口，将在打包后自动展示
    }),
    // Gzip
    viteCompression(),
    // mock
    viteMockServe({
      mockPath: 'mock',
      watchFiles: false, // # 设置为false， 否则mock文件一旦变动会生成很多mjs文件
      enable: true
    })
  ]

  return plugins
}
