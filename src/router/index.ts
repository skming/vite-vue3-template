import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import { commonStore } from '@/store/modules/common'

// 导入所有router
const metaRouters: any = import.meta.glob('./modules/*.ts', { eager: true })
// 处理路由表
const routerArray: RouteRecordRaw[] = []
Object.keys(metaRouters).forEach((item) => {
  Object.keys(metaRouters[item]).forEach((key: string) => {
    routerArray.push(...metaRouters[item][key])
  })
})

const routes: RouteRecordRaw[] = [
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
  if (typeof (to.meta?.title) === 'string')
    document.title = to.meta?.title
  commonStore().addCachesList(to) // 路由缓存
})

export default router
