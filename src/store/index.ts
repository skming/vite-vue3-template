// src/store/index.ts
import { createPinia } from 'pinia'

export const store = createPinia()

export * from './modules/common'
export * from './modules/test'
