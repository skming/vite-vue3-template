import { defineStore } from 'pinia'

export interface TState {
  name: string
}

export const testStore = defineStore('test', {
  state: () => ({
    name: 'test',
  }),
  getters: {
    fullName: state => `${state.name}测试`,
  },
  actions: {
    updateState(data: any) {
      this.name = data
    },
  },
})
