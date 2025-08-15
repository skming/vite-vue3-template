import VConsole from 'vconsole'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store'

// 引入全局样式
import 'virtual:uno.css'
import '@/styles/index.scss'

if (import.meta.env.VITE_ENV !== 'production') {
  // eslint-disable-next-line unused-imports/no-unused-vars
  const vConsole = new VConsole()
}

const app = createApp(App)

app.use(store)
app.use(router)
app.mount('#app')
