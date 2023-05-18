import { defineStore } from 'pinia'
import type { RouteLocationNormalized } from 'vue-router'

interface PState {
  cachesList: string[]
}

export const commonStore = defineStore({
  id: 'common',
  state: (): PState => ({
    cachesList: [],
  }),
  getters: {},
  actions: {
    addCachesList(to: RouteLocationNormalized) {
      const name = to?.name as string
      const { keepAlive } = to.meta
      keepAlive && !this.cachesList?.includes(name) && this.cachesList.push(name)
    },
  },
})
