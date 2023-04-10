import { defineStore } from 'pinia'

export const testStore = defineStore({
  id: 'test',
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
