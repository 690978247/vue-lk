import type { ConfigEnv, UserConfig } from 'vite'
import { defineConfig, loadEnv } from 'vite'
import { wrapperEnv } from './src/utils/getEnv'
import path from 'path'

import postCssPxToRem from 'postcss-pxtorem'
import { viteProxyConfig } from './build/config/proxy'
import { setupVitePlugins } from './build/plugins'

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd())
  const viteEnv = wrapperEnv(env)

  return {
    plugins: setupVitePlugins(viteEnv),
    resolve: {
      alias: {
        // '@': fileURLToPath(new URL('./src', import.meta.url))
        '@': path.join(__dirname, 'src')
      }
    },
    // 使用 scss.additionalData 来编译所有应用 scss 变量的组件。
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/var.scss" as *;`
        }
      },
      postcss: {
        plugins: [
          postCssPxToRem({
            rootValue: 19.2, // 1rem的大小
            propList: ['*'] // 需要转换的属性，这里选择全部都进行转换
          }),
          require('tailwindcss'), // 确保 TailwindCSS 插件被加载
          require('autoprefixer') // 确保 Autoprefixer 插件被加载
        ]
      }
    },
    // * 打包去除 console.log && debugger
    esbuild: {
      pure: viteEnv.VITE_DROP_CONSOLE ? ['console.log', 'debugger'] : []
    },
    build: {
      outDir: 'dist',
      // minify: 'esbuild',
      sourcemap: false,
      // 消除打包大小超过500kb警告
      chunkSizeWarningLimit: 4000,
      /* esbuild 打包更快，但是不能去除 console.log，terser打包慢，但能去除 console.log */
      // minify: "terser",
      // terserOptions: {
      // 	compress: {
      // 		drop_console: viteEnv.VITE_DROP_CONSOLE,
      // 		drop_debugger: true
      // 	}
      // },
      rollupOptions: {
        output: {
          /* 处理打包文件太大警告 */
          // manualChunks(id) {
          //   if (id.includes('node_modules')) {
          //       return id.toString().split('node_modules/')[1].split('/')[0].toString();
          //   }
          // },
          // Static resource classification and packaging
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
        }
      }
    },
    server: {
      // 服务器主机名，如果允许外部访问，可设置为 "0.0.0.0"
      host: '0.0.0.0',
      open: viteEnv.VITE_OPEN,
      port: viteEnv.VITE_PORT,
      cors: true,
      // 代理跨域（mock 不需要配置跨域，直接能访问，这里只是个示例）
      proxy: viteProxyConfig(mode)
    }
  }
})
