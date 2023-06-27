import { defineStore } from 'pinia'

interface PState {
  token: string
}

export const commonStore = defineStore({
  id: 'common',
  state: (): PState => ({
    token: '',
  }),
  getters: {},
  actions: {},
})
