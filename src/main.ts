import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store'

// 引入全局样式
import 'virtual:uno.css'
import '@/styles/index.scss'

if (import.meta.env.VITE_ENV !== 'production') {
  import('eruda').then((eruda) => {
    eruda.default.init()
  })
}

const app = createApp(App)

app.use(store)
app.use(router)
app.mount('#app')
