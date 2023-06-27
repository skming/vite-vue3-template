// 引入全局样式
import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'

import '@/styles/index.scss'

// 使用unplugin-vue-components导致部分组件样式没有正常引入 https://github.com/youzan/vant/issues/10709
import 'vant/es/toast/style'
import 'vant/es/dialog/style'
import 'vant/es/notify/style'
import 'vant/es/image-preview/style'

import { createApp } from 'vue'
import VConsole from 'vconsole'
import App from './App.vue'
import router from './router'
import { store } from './store'

if (import.meta.env.VITE_ENV !== 'production') {
  const vConsole = new VConsole()
}

const app = createApp(App)

app.use(store)
app.use(router)
app.mount('#app')
