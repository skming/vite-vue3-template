import type { RouteRecordRaw } from 'vue-router'

export const userRouter: Array<RouteRecordRaw> = [
  {
    path: '/test',
    name: 'test',
    meta: {
      title: '测试',
      keepAlive: true,
    },
    component: () => import('@/pages/test/index.vue'),
  },
]
