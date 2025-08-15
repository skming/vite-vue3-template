import { defineStore } from 'pinia'

export interface PState {
  token: string
  theme: 'light' | 'dark'
}

export const commonStore = defineStore('common', {
  state: (): PState => ({
    token: '',
    theme: 'light', // light | dark
  }),
  getters: {
    getTheme: state => state.theme,
  },
  actions: {
    setTheme(theme: 'light' | 'dark') {
      this.theme = theme
    },
  },
})
