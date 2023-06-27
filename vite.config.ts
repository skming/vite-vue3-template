import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'
import Unocss from 'unocss/vite'
import postcsspxtoviewport8plugin from 'postcss-px-to-viewport-8-plugin'
import dayjs from 'dayjs'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // https://github.com/antfu/unocss
    // see unocss.config.ts for config
    Unocss(),
    // https://github.com/antfu/unplugin-vue-components
    Components({
      // allow auto load markdown components under `./src/components/`
      resolvers: [VantResolver()],
      extensions: ['vue', 'md'],
      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dts: 'src/components.d.ts',
    }),
    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        'vue',
        'vue-router',
      ],
      dts: 'src/auto-imports.d.ts',
      dirs: [
        // 'src/store',
      ],
      vueTemplate: true,
    }),
  ],
  resolve: {
    alias: [
      { find: '@', replacement: `${resolve(__dirname, 'src/')}` },
    ],
  },
  server: {
    // 服务器主机名
    host: true,
    // 端口号
    port: 3030,
    // 设为 true 时若端口已被占用则会直接退出，而不是尝试下一个可用端口
    strictPort: false,
    // 服务器启动时自动在浏览器中打开应用程序,当此值为字符串时，会被用作 URL 的路径名
    open: false,
    // 自定义代理规则
    proxy: {
      // 选项写法
      // '/api': {
      //   target: 'http://jsonplaceholder.typicode.com',
      //   changeOrigin: true,
      //   rewrite: path => path.replace(/^\/api/, ''),
      // },
    },
  },
  esbuild: {
    pure: ['console.log'],
  },
  css: {
    preprocessorOptions: {
      scss: {
        charset: false, // 避免出现: build时的 @charset 必须在第一行的警告
        additionalData: `
          @import "@/styles/mixin.scss";
          @import "@/styles/variables.scss";
        `,
      },
    },
    postcss: {
      plugins: [
        postcsspxtoviewport8plugin({
          unitToConvert: 'px',
          viewportWidth: (file) => {
            return file.includes('vant') ? 375 : 750
          },
          unitPrecision: 5, // 单位转换后保留的精度
          propList: ['*'], // 能转化为vw的属性列表
          viewportUnit: 'vw', // 希望使用的视口单位
          fontViewportUnit: 'vw', // 字体使用的视口单位
          selectorBlackList: ['van'], // 需要忽略的CSS选择器，不会转为视口单位，使用原有的px等单位。
          minPixelValue: 1, // 设置最小的转换数值，如果为1的话，只有大于1的值会被转换
          mediaQuery: true, // 媒体查询里的单位是否需要转换单位
          replace: true, //  是否直接更换属性值，而不添加备用属性
          exclude: [/node_modules\/vant/], // 忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
          include: [], // 如果设置了include，那将只有匹配到的文件才会被转换
          landscape: false, // 是否添加根据 landscapeWidth 生成的媒体查询条件 @media (orientation: landscape)
          landscapeUnit: 'vw', // 横屏时使用的单位
          landscapeWidth: 1024, // 横屏时使用的视口宽度
        }),
      ],
    },
  },
  define: {
    __BUILD_TIME__: JSON.stringify(dayjs().format('YYYY/MM/DD HH:mm')),
  },
})
