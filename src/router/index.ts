import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

// 导入所有router
const metaRouters: any = import.meta.glob('./modules/*.ts', { eager: true })
// 处理路由表
export const routerArray: Array<RouteRecordRaw> = []
Object.keys(metaRouters).forEach((item) => {
  Object.keys(metaRouters[item]).forEach((key: string) => {
    routerArray.push(...metaRouters[item][key])
  })
})

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/test',
  },
  ...routerArray,
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

router.beforeEach((to, from) => {
})

export default router
