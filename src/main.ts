// 引入全局样式
import '@unocss/reset/tailwind.css'
import '@/styles/index.scss'
import 'vant/lib/index.css'
import 'uno.css'

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
