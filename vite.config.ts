import { UserConfig, ConfigEnv } from 'vite'
import { resolve } from 'path'
import { createVitePlugins } from './build/vite/plugin'

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
  const isBuild = command === 'build'
  console.log(command, mode)

  return {
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'), // 设置 `@` 指向 `src` 目录
        '#': resolve(__dirname, 'types') // 设置 `#` 指向 `types` 目录
      }
    },

    // plugins
    plugins: createVitePlugins(isBuild),

    // server
    server: {
      // 服务配置
      port: 3000, // 类型： number 指定服务器端口;
      open: true, // 类型： boolean | string在服务器启动时自动在浏览器中打开应用程序；
      cors: true, // 类型： boolean | CorsOptions 为开发服务器配置 CORS。默认启用并允许任何源
      host: '0.0.0.0', // IP配置，支持从IP启动
      proxy: {
        '/api': {
          target: 'https://api-cloud.vbhledger.com/v1/vbh-trace-chain/',
          changeOrigin: true,
          secure: false,
          rewrite: (path: any) => path.replace('^/api', '')
        }
      }
    },
    // css
    css: {
      preprocessorOptions: {
        scss: {
          modifyVars: {},
          javascriptEnabled: true,
          additionalData: `@import "src/styles/variables.scss";`
        }
      }
    },
    // build
    build: {
      target: 'es2015',
      outDir: 'dist',
      terserOptions: {
        compress: {
          keep_infinity: true,
          drop_console: true
        }
      },
      brotliSize: false,
      chunkSizeWarningLimit: 2000
    }
  }
}
