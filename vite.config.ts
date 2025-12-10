import { defineConfig, loadEnv } from "vite"
import { resolve } from "path"
import pkg from "./package.json"
import vue from "@vitejs/plugin-vue"
import eslint from "vite-plugin-eslint"
import Markdown from "vite-plugin-md"
import MarkdownItprism from "markdown-it-prism"
import dts from "vite-plugin-dts"

// https://vitejs.dev/config/
export default defineConfig((config) => {
  const baseConfig = {
    define: {
      __APP_VERSION__: `"${pkg.version}"`
    },
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
        events: "rollup-plugin-node-polyfills/polyfills/events"
      }
    },
  }

  switch (config.mode) {
    case 'lib':
      return Object.assign(baseConfig, getLibraryConfig())
    default:
      return Object.assign(baseConfig, getDefaultConfig(config))
  }
})

function getDefaultConfig(config) {
  const env = loadEnv(config.mode, process.cwd())

  return {
    base: env.VITE_APP_PUBLIC_PATH,
    plugins: [
      vue({
        include: [/\.vue$/, /\.md$/]
      }),
      eslint({
        include: ["{src,packages,examples}/**/*.{j,t}s?(x)", "{src,packages,examples}/**/*.vue"]
      }),
      Markdown({
        markdownItOptions: {
          html: true,
          linkify: true,
          typographer: true,
        },
        markdownItSetup(md) {
          // add code syntax highlighting with Prism
          md.use(MarkdownItprism)
        }
      })
    ],
    build: {
      assetsDir: pkg.version,
      cssTarget: "chrome61"
    }
  }
}

function getLibraryConfig() {
  return {
    build: {
      lib: {
        entry: resolve(__dirname, 'packages/index.ts'),
        name: 'YuumiUiVue',
        fileName: (format) => `index-${format}.js`
      },
      rollupOptions: {
        // 确保外部化处理那些你不想打包进库的依赖
        external: ['vue', 'vue-router'],
        output: {
          // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
          globals: {
            vue: 'Vue'
          },
          // 允许同时使用命名导出和默认导出
          exports: 'named' as const
        }
      }
    },
    plugins: [
      vue(),
      dts({
        // 配置插件
        include: ['packages/**/*'],
        exclude: ['node_modules', 'examples'],
        insertTypesEntry: true,
        cleanVueFileName: true,
        copyDtsFiles: true
      })
    ]
  }
}
